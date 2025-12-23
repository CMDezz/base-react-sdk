import { useEffect } from "react";

const EkycSDK = () => {
  useEffect(() => {
    const ekycInstance = new (window as any).EkycInstance();

    ekycInstance.initialize({
      core: {
        API_KEY: "123",
        TARGET: "REACT",
      },
    });
    ekycInstance.render();
  }, []);
  return <div is="savvy-sdk-comp"></div>;
};
export default EkycSDK;
