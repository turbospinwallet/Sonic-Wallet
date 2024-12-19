export interface CommonResponse<T> {
  status_code: string;
  data: T;
  payload?: T;
  message?: string;
}
