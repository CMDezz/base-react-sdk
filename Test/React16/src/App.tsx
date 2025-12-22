import { useEffect } from "react";

const Ekyc = () => {
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

const App = (): JSX.Element => {
  return (
    <div>
      <p>DEMO REACT 16</p>
      <Ekyc />
    </div>
  );
};

export default App;
