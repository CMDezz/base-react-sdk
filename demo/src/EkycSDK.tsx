import { useEffect } from 'preact/hooks';

type EkycSDKProps = {
  config: SDKConfig;
};
const EkycSDK = (props: EkycSDKProps) => {
  useEffect(() => {
    console.log('mounted with new con fig ', props.config);
    const ekycInstance = new window.EkycInstance();

    ekycInstance.initialize(props.config);
    ekycInstance.render();
  }, [props.config]);
  // return <div id="savvy-sdk-comp"></div>;
  return <div is="savvy-sdk-comp"></div>;
};
export default EkycSDK;
