import { useEffect } from "react";
import { InitializeError, SDK_ERROR_MESSAGES } from "../utils/errors";

const useApiKey = ({ API_KEY }: { API_KEY: string }) => {
  useEffect(() => {
    if (!API_KEY) {
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_API_KEY);
    }

    //connect api checking
    // throw new InitializeError(SDK_ERROR_MESSAGES.INVALID API KEY);
  }, []);

  return {
    API_KEY: API_KEY,
  };
};
export default useApiKey;
