type PromiseApiResponse<T> = Promise<ApiResponse<T>>;

// type ApiResponseSuccess<T> = {
//   success: true;
//   code: number;
//   message: string;
//   data: T;
// };

// type ApiResponseError = {
//   success: false;
//   code: number;
//   errorMessage: string;
//   error: string;
// };

type ApiResponse<T> = {
  errorMessage: string;
  error: string;
  code: number;
  message: string;
  data: T;
};
//giả định
type UserContext = {
  clientUserId?: string;
};
type AuthTokenResponse = {
  token: string;
};
type SessionResponse = {
  sessionId: string;
};
type ProcessResponse = {
  status: string;
};
