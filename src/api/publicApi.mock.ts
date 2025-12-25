import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mock } from '@shared/api/mockService';
import { DOC_SIDE, VERIFY_MODE } from '@sdk/utils/constant';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// POST /auth/token
mock('POST', '/auth/token', async (config: AxiosRequestConfig) => {
  const body = JSON.parse(config.data) as {
    API_KEY?: string;
  };

  if (!body?.API_KEY) {
    return {
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config,
      data: {
        success: false,
        message: 'API_KEY is required',
      },
    } as AxiosResponse;
  }

  // simulate invalid key
  if (body.API_KEY !== '123') {
    return {
      status: 403,
      statusText: 'Forbidden',
      headers: {},
      config,
      data: {
        success: false,
        message: 'Invalid API_KEY',
      },
    } as AxiosResponse;
  }

  // success response
  return {
    status: 200,
    statusText: 'OK',
    config,
    headers: {
      'Set-Cookie': 'accessToken=mock-123; HttpOnly; Secure; SameSite=Strict',
    },
    data: { success: true, message: 'Authenticated' },
  } as AxiosResponse;
});

// POST /sessions
mock('POST', '/sessions', async (config: AxiosRequestConfig) => {
  await sleep(2000);
  const body = JSON.parse(config.data) as {
    mode?: VERIFY_MODE;
  };

  if (body?.mode == undefined) {
    return {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config,
      data: {
        success: false,
        message: 'VERIFY_MODE is required',
      },
    } as AxiosResponse;
  }

  // optional: validate enum
  //
  if (VERIFY_MODE[body.mode] == undefined) {
    return {
      status: 422,
      statusText: 'Unprocessable Entity',
      headers: {},
      config,
      data: {
        success: false,
        message: `Invalid mode: ${body.mode}`,
      },
    } as AxiosResponse;
  }

  // success
  return {
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    data: {
      success: true,
      data: {
        // sessionId: `sess_${Math.random().toString(36).slice(2)}`,
        sessionId: 'sess_y1k2298nsil',
        mode: body.mode,
        accessToken: 'mock-session-token-xyz',
        tokenType: 'Bearer',
        expiredAt: Date.now() + 30 * 60 * 1000,
      },
    },
  } as AxiosResponse;
});

// POST /sessions/:sessionId/documents
const mock_session_id = 'sess_y1k2298nsil';
mock(
  'POST',
  `/sessions/${mock_session_id}/documents`,
  async (config: AxiosRequestConfig) => {
    if (!mock_session_id) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'Missing sessionId',
        },
      } as AxiosResponse;
    }

    const formData = config.data as FormData;

    if (!(formData instanceof FormData)) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'Expected multipart/form-data',
        },
      } as AxiosResponse;
    }

    const docSide = formData.get('docSide');
    const image = formData.get('image');

    // ---- validation ----
    if (!docSide) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'docSide is required',
        },
      } as AxiosResponse;
    }

    const docSideFormatted = Number(docSide);

    if (DOC_SIDE[docSideFormatted] == undefined) {
      return {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config,
        data: {
          success: false,
          message: `Invalid docSide: ${docSideFormatted}`,
        },
      } as AxiosResponse;
    }

    if (!(image instanceof File)) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'image file is required',
        },
      } as AxiosResponse;
    }

    // ---- success ----
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      data: {
        success: true,
        data: {
          documentId: `doc_${Math.random().toString(36).slice(2)}`,
          sessionId: mock_session_id,
          side: docSide,
          status: 'PROCESSING',
          uploadedAt: Date.now(),
        },
      },
    } as AxiosResponse;
  }
);

// POST /sessions/:session_id/liveness
mock(
  'POST',
  `/sessions/${mock_session_id}/liveness`,
  async (config: AxiosRequestConfig) => {
    if (!mock_session_id) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'Missing session_id',
        },
      } as AxiosResponse;
    }

    const formData = config.data as FormData;

    if (!(formData instanceof FormData)) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'Expected multipart/form-data',
        },
      } as AxiosResponse;
    }

    const docSide = formData.get('docSide');
    const images = formData.getAll('image');

    // ---- validation ----

    if (!Object.values(DOC_SIDE).includes(Number(docSide))) {
      return {
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config,
        data: {
          success: false,
          message: `Invalid docSide: ${docSide}`,
        },
      } as AxiosResponse;
    }

    if (!images.length) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'At least one image is required',
        },
      } as AxiosResponse;
    }

    const invalidImage = images.find((img) => !(img instanceof File));

    if (invalidImage) {
      return {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
        data: {
          success: false,
          message: 'Invalid image file',
        },
      } as AxiosResponse;
    }

    // ---- success ----
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      data: {
        success: true,
        data: {
          livenessId: `live_${Math.random().toString(36).slice(2)}`,
          sessionId: mock_session_id,
          side: docSide,
          imageCount: images.length,
          status: 'PROCESSING',
          uploadedAt: Date.now(),
        },
      },
    } as AxiosResponse;
  }
);
