import { useEffect, useState } from 'react';
import { InitializeError, SDK_ERROR_MESSAGES } from '../utils/errors';
import { publicApi } from '@sdk/api';

const useApiKey = ({ API_KEY }: { API_KEY: string }) => {
  const [apiKey, setApiKey] = useState('');

  const verifyApiKey = async (apiKey: string) => {
    const res = await publicApi.verifyApiKey(apiKey);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (res as any) {
      setApiKey('');
      return res;
    } else {
      //
    }
  };
  useEffect(() => {
    if (!API_KEY) {
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_API_KEY);
    }

    verifyApiKey(API_KEY);
    //connect api checking
    // throw new InitializeError(SDK_ERROR_MESSAGES.INVALID API KEY);
  }, []);

  return {
    API_KEY: apiKey,
  };
};
export default useApiKey;
