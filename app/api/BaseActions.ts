import axios, { AxiosError } from "axios";

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
  } else if (method === "PATCH") {
    return await patchApi<T>(route, params);
  } else {
    return await getApi<T>(route);
  }
}

async function getApi<T>(route: string) {
  const hostname = getUrl();
  try {
    return axios
      .get<BaseResponseType<T>>(`${hostname}${route}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (axiosError: AxiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
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
    return axios
      .post<BaseResponseType<T>>(`${hostname}${route}`, params)
      .then(function (response) {
        return response.data;
      })
      .catch(function (axiosError: AxiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
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
    return axios
      .delete<BaseResponseType<T>>(`${hostname}${route}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (axiosError: AxiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        } as BaseResponseType<T>;
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    } as BaseResponseType<T>;
  }
}

async function patchApi<T>(route: string, params: object) {
  const hostname = getUrl();
  try {
    return axios
      .patch<BaseResponseType<T>>(`${hostname}${route}`, params)
      .then(function (response) {
        return response.data;
      })
      .catch(function (axiosError: AxiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        } as BaseResponseType<T>;
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    } as BaseResponseType<T>;
  }
}
