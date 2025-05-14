// API Response Default Type
export interface ApiResponse<T> {
  result: T;
  code: string;
  message: string;
}

// API Response Error Type
export interface ApiResponseError {
  code: string;
  message: string;
}
