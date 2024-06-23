import { ClientError, SystemError, isClientError } from './error';

interface Success<T> {
  data: T;
  error: undefined;
}

interface Failure {
  data: undefined;
  error: ClientError;
}

export type LoaderFetcher<T> = (fetcher: () => Promise<T>) => Promise<Success<T> | Failure>;

export const loaderFetcher = async <T>(fetcher: () => Promise<T>): Promise<Success<T> | Failure> => {
  try {
    return { data: await fetcher(), error: undefined };
  } catch (error: unknown) {
    if (isClientError(error)) {
      return { data: undefined, error };
    }

    return { data: undefined, error: new SystemError() };
  }
};
