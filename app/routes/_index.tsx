import React, { useCallback, useMemo } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { Card, Pagination, SkeltonCards } from '@components/ui';
import { Container, Grid, Column, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { usePosts } from '@modules/api';
import { useSearchParamsPagination } from '@modules/hooks';
import { useSearchParams } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt' },
    {
      name: 'description',
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
};

export default function Page() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(
    () => (Number.isFinite(Number(searchParams.get('page'))) ? Number(searchParams.get('page')) : 1),
    [searchParams]
  );

  const handleChangePage = useCallback((p: number | undefined) => {
    if (!p) {
      return setSearchParams((state) => {
        state.delete('page');
        return state;
      });
    }

    setSearchParams((state) => {
      state.set('page', p.toString());
      return state;
    });
  }, []);
  const { data: posts, isLoading, mutate } = usePosts({ limit: 12, page });

  const pagination = useMemo(() => [...Array(posts?.pages)].map((_, i) => i + 1), [posts?.pages]);

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <Grid>
          {posts?.data.map((post) => (
            <Column key={post.id} size="md">
              <Card to={post.url} category={post.media} title={post.title} />
            </Column>
          ))}
        </Grid>
      )}
      <Pagination
        pagination={pagination}
        current={page}
        onClick={async (p) => {
          handleChangePage(p);
          mutate();
        }}
      />
    </Container>
  );
}
