type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Record<string, any>;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
};

class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<any> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache = 'default',
    revalidate,
  } = options;
  try {
    const response = await fetch(
      `${process.env.STRAPI_BASE_URL}/api${endpoint}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        cache,
        next: revalidate ? { revalidate } : undefined,
      },
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
