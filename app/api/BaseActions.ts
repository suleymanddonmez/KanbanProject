export interface BaseResponseType<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function getUrl() {
  try {
    const { protocol, hostname, port } = window.location;
    const apiUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
    return apiUrl;
  } catch {
    return "";
  }
}

export async function fetchApi<T>(route: string, method: string = "GET", params?: any) {
  if (method === "POST") {
    return await postApi<T>(route, params);
  } else if (method === "DELETE") {
    return await deleteApi<T>(route, params);
  } else {
    return await getApi<T>(route);
  }
}

async function getApi<T>(route: string) {
  const hostname = getUrl();
  try {
    return fetch(`${hostname}${route}`)
      .then((fetchResponse) => {
        return fetchResponse.json();
      })
      .then((response) => {
        return response as BaseResponseType<T>;
      })
      .catch((error) => {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        } as BaseResponseType<T>;
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    } as BaseResponseType<T>;
  }
}

async function postApi<T>(route: string, params: object) {
  const hostname = getUrl();
  try {
    return fetch(`${hostname}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((fetchResponse) => {
        return fetchResponse.json();
      })
      .then((response) => {
        return response as BaseResponseType<T>;
      })
      .catch((error) => {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        } as BaseResponseType<T>;
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    } as BaseResponseType<T>;
  }
}

async function deleteApi<T>(route: string, params: object) {
  const hostname = getUrl();
  try {
    return fetch(`${hostname}${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((fetchResponse) => {
        return fetchResponse.json();
      })
      .then((response) => {
        return response as BaseResponseType<T>;
      })
      .catch((error) => {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        } as BaseResponseType<T>;
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    } as BaseResponseType<T>;
  }
}
