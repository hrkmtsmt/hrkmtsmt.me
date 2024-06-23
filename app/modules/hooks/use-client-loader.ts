import { useLoaderData } from '@remix-run/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useClientLoader = <T extends (...args: any) => Promise<unknown>>() => {
  return useLoaderData() as Awaited<ReturnType<T>>;
};
