export interface BaseResponseType<T> {
  success: boolean;
  data?: T;
  error?: string;
}
