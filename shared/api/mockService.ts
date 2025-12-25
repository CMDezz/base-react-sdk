/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  AxiosAdapter,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

type MockHandler = (
  config: AxiosRequestConfig
) => Promise<AxiosResponse> | AxiosResponse;

const mockRoutes: Record<string, MockHandler> = {};

export function mock(
  method: string,
  url: string | RegExp,
  handler: MockHandler
) {
  mockRoutes[`${method.toUpperCase()} ${url}`] = handler;
}

export function enableAxiosMock(instance: AxiosInstance) {
  const defaultAdapter = instance.defaults.adapter as AxiosAdapter;

  instance.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toUpperCase();

    let urlPath = config.url || '';
    try {
      if (urlPath.startsWith('http')) {
        urlPath = new URL(urlPath).pathname;
      }
    } catch (e) {
      console.error('URL Parsing error', e);
    }

    console.log('config ', config);
    const key = `${method} ${urlPath}`;
    const handler = mockRoutes[key];

    console.log('key ', key);
    console.log('mockRoutes ', mockRoutes);

    if (handler) {
      console.log(`%c [Mock Hit]: ${key}`, 'color: #00ff00');
      return await handler(config);
    }

    // Nếu không khớp mock, mới cho phép gọi ra ngoài
    console.warn(
      `%c [Mock Miss]: ${key} - calling real network`,
      'color: #ff9900'
    );

    return defaultAdapter?.(config);
  };
}
