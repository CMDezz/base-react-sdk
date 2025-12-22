import { apiService } from "./service";

const publicApi = {
  verifyApiKey: async (apiKey: string) => {
    const url = "/verify_api_key?apiKey=" + apiKey;
    console.log("--1", apiKey);
    const res = await apiService.get(url);
    // const res = await new Promise((resolve) =>
    //   setTimeout(
    //     () =>
    //       resolve({
    //         success: true,
    //         message: "API Key is valid.",
    //         data: "some api key",
    //       }),
    //     500
    //   )
    // );
    console.log("--2 ", res);
    return res;
  },
};

export default publicApi;
