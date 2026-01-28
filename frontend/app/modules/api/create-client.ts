import { ApiError, FetchError, SystemError, isApiError, isErrorResponse, isFetchError } from "./error";

export const HTTP_METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
} as const;

type HttpMethods = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

const createBody = <U>(body?: U) => {
  if (!body) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  return JSON.stringify(body);
};

type Headers = Record<string, string>;

const fetcher = async <T, U>(url: string, method: HttpMethods, body?: U, headers?: Headers): Promise<T> => {
  try {
    const response = await fetch(url, {
      mode: "cors",
      method,
      body: createBody<U>(body),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    if (response.ok) {
      return data as T;
    }

    if (isErrorResponse(data)) {
      throw new ApiError(data.message);
    }

    throw new FetchError(data);
  } catch (error: unknown) {
    if (isApiError(error) || isFetchError(error)) {
      throw error;
    }

    throw new SystemError({ url, error });
  }
};

const generateURL = (baseURL: string) => (path: string) => `${baseURL}${path}`;

export const createClient = (baseURL: string, headers?: Headers) => {
  const toURL = generateURL(baseURL);

  return {
    get: async <T>(path: string): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.get, undefined, headers);
    },
    post: async <T, U>(path: string, body?: U): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.post, body, headers);
    },
    put: async <T, U>(path: string, body?: U): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.put, body, headers);
    },
    patch: async <T, U>(path: string, body?: U): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.patch, body, headers);
    },
    delete: async <T, U = undefined>(path: string, body?: U): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.delete, body, headers);
    },
  };
};

const basicAuth = (username: string, password: string) => {
  return `Basic ${btoa(`${username}:${password}`)}`;
};

const getBaseURL = () => {
  // 開発環境ではプロキシを使用
  if (import.meta.env.DEV) {
    return "/api";
  }
  // 本番環境では直接APIサーバーにアクセス
  return import.meta.env.VITE_API_BASE_URL;
};

export const client = createClient(getBaseURL(), {
  Authorization: basicAuth(import.meta.env.VITE_API_BASIC_AUTH_USERNAME, import.meta.env.VITE_API_BASIC_AUTH_PASSWORD),
  "Access-Control-Allow-Origin": import.meta.env.BASE_URL,
});
