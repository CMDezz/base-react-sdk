import { useEffect } from 'react';

const EkycSDK = () => {
  useEffect(() => {
    const ekycInstance = new window.EkycInstance();

    ekycInstance.initialize({
      core: {
        API_KEY: '123',
        TARGET: 'REACT',
      },
      module: {
        FaceMatching: false,
        Liveness: false,
        OCRAndLiveness: false,
      },
    });
    ekycInstance.render();
  }, []);
  return <div is="savvy-sdk-comp"></div>;
};
export default EkycSDK;
