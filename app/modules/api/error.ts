interface ErrorResponse {
  statusCode: number;
  message: string;
  description: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isErrorResponse = (data: any): data is ErrorResponse => {
  const KEY = "message" as const;

  return KEY in data;
};

const ERRORS = {
  api: {
    name: "API_ERROR",
    message: undefined,
  },
  fetch: {
    name: "FETCH_ERROR",
    message: "データ取得に失敗しました",
  },
  systemError: {
    name: "SYSTEM_ERROR",
    message: "システムエラーです",
  },
} as const;

export class ApiError extends Error {
  constructor(message: string, error?: unknown) {
    super(message);
    this.name = ERRORS.api.name;
    console.error(error);
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export class FetchError extends Error {
  constructor(error?: unknown) {
    super();
    this.name = ERRORS.fetch.name;
    this.message = ERRORS.fetch.message;
    console.error(error);
  }
}

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof FetchError;
};

export class SystemError extends Error {
  constructor(error?: unknown) {
    super();
    this.name = ERRORS.systemError.name;
    this.message = ERRORS.systemError.message;
    console.error(error);
  }
}

export const isSystemError = (error: unknown): error is SystemError => {
  return error instanceof SystemError;
};

export type ClientError = ApiError | FetchError | SystemError;

export const isClientError = (error: unknown): error is ClientError => {
  return isApiError(error) || isFetchError(error) || isSystemError(error);
};
