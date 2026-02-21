import { Client, toBasicAuth } from "@modules";
import type { Env } from "@types";
import type * as Articles from "./articles.types";

const articles = (client: Client) => ({
	list: async (params: Articles.GetParams) =>
		client.get<any>(`/${params.hatenaId}/${params.blogId}/atom/entry`),
});

// DOCS: https://developer.hatena.ne.jp/
export const hatena = (env: Env["Bindings"]) => {
	const c = new Client(env.HATENA_API_URL, { Authorization: toBasicAuth(env.BASIC_AUTH_USERNAME, env.HATENA_API_KEY) });

	return {
		articles: articles(c),
	};
};
