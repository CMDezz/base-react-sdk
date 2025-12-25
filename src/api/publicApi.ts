import { DOC_SIDE, VERIFY_MODE } from '@sdk/utils/constant';
import { apiService } from '@shared/api/service';

if (import.meta.env.DEV) {
  await import('./publicApi.mock');
}
const publicApi = {
  authToken: async (
    API_KEY: string
    // userContext: UserContext
  ): PromiseApiResponse<AuthTokenResponse> => {
    const url = '/auth/token';
    return await apiService.post<AuthTokenResponse>(url, {
      API_KEY,
      // userContext,
    });
  },
  session: async (
    // memberRef: unknow,
    // userContext: unknow,
    mode: VERIFY_MODE
  ): PromiseApiResponse<SessionResponse> => {
    const url = '/sessions';
    return await apiService.post<SessionResponse>(url, {
      mode,
      // memberRef,
      // userContext,
    });
  },
  sessionDocuments: async (
    docSide: DOC_SIDE,
    sessionId: string,
    image: File
  ): PromiseApiResponse<ProcessResponse> => {
    const url = `/sessions/${sessionId}/documents`;

    const formData = new FormData();
    formData.append('docSide', docSide + '');
    formData.append('image', image); // File

    return apiService.postForm<ProcessResponse>(url, formData);
  },

  sessionLiveness: async (
    docSide: DOC_SIDE,
    sessionId: string,
    images: File[]
  ): PromiseApiResponse<ProcessResponse> => {
    const url = `/sessions/${sessionId}/liveness`;

    const formData = new FormData();
    formData.append('docSide', docSide + '');
    images.forEach((image) => {
      formData.append('image', image); // File
    });
    return apiService.postForm<ProcessResponse>(url, formData);
  },
};

export default publicApi;
