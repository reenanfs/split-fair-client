export interface ResponseModel<T> {
  ok: boolean;
  message: string;
  data: T;
}

export interface ListResponseModel<T> {
  ok: boolean;
  message: string;
  data: T[];
}
