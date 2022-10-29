import { api } from '@src/api';
import { XMLParser } from 'fast-xml-parser';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ArticleLink, ParsedZennXML, ParsedQiitaXML } from './types';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method.toLocaleLowerCase() !== 'get') {
    return response.status(405).end();
  }

  const zennXML = await api.get<string>(
    '/cors-anywhere?endpoint=https://zenn.dev/hrkmtsmt/feed'
  );

  const qiitaXML = await api.get<string>(
    '/cors-anywhere?endpoint=https://qiita.com/hrkmtsmt/feed'
  );

  if (zennXML instanceof Error || qiitaXML instanceof Error) return;

  const xmlParser = new XMLParser();

  const parsedZennXML = xmlParser.parse(zennXML) as ParsedZennXML;
  const zennArticles = parsedZennXML.rss.channel.item.map((article) => {
    return {
      title: article.title,
      description: article.description,
      url: article.link,
      publishedAt: new Date(article.pubDate).toISOString()
    };
  });

  const parsedQiitaXML = xmlParser.parse(qiitaXML) as ParsedQiitaXML;
  const qiitaArticles = parsedQiitaXML.feed.entry.map((article) => {
    return {
      title: article.title,
      description: article.content,
      url: article.url,
      publishedAt: new Date(article.published).toISOString()
    };
  });

  const articles: Array<ArticleLink> = zennArticles
    .concat(qiitaArticles)
    .map((article) => {
      const _media = article.url
        .split('/')
        .find((string) => string.match(/\./))
        .split('.')
        .shift();
      const media = _media.charAt(0).toUpperCase() + _media.slice(1);
      return {
        media,
        ...article
      };
    })
    .sort((a, b) => {
      return Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt));
    });

  response.status(200).json(articles);
  response.status(200).end();
};

export default handler;
