import { useState } from "react";
import Button from "./base/BaseButton";
import useApiKey from "../hooks/useApiKey";
import "../index.css";
import { SDKError } from "@/utils/errors";
import SDKErrorFallback from "./SDKErrorFallback";
import OCRBack from "./OCRBack";
import Result from "./Result";
import { Toaster } from "sonner";

interface Props {
  context: SDKContext;
  err?: SDKError;
}

type SDKStep = "FRONT" | "BACK" | "RESULT";

function SDKContent({ context, err }: Props) {
  const { API_KEY } = useApiKey({
    API_KEY: context.config.core.API_KEY,
  });
  console.log("API_KEY ", API_KEY);

  const [step, setStep] = useState<SDKStep>("FRONT");
  const [scannedData, setScannedData] = useState<any>({});

  if (err) {
    //handle error
    return <SDKErrorFallback context={context} err={err} />;
  }

  const handleFrontCapture = () => {
    // Simulate front capture logic
    setScannedData((prev: any) => ({ ...prev, front: "Front Image Data" }));
    setStep("BACK");
  };

  const handleBackCapture = (data: any) => {
    setScannedData((prev: any) => ({ ...prev, back: data }));
    setStep("RESULT");
  };

  const handleRestart = () => {
    setScannedData({});
    setStep("FRONT");
  };

  return (
    <div className="sdk-container">
      {step === "FRONT" && (
        <div className="sdk-view-front">
          <h3>Scan Front Side</h3>
          <div
            style={{
              height: 200,
              background: "#eee",
              margin: "1rem 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Front Camera Preview
          </div>
          <Button onClick={handleFrontCapture}>Capture Front</Button>
        </div>
      )}

      {step === "BACK" && (
        <OCRBack
          onCapture={handleBackCapture}
          onBack={() => setStep("FRONT")}
        />
      )}

      {step === "RESULT" && (
        <Result data={scannedData} onRestart={handleRestart} />
      )}
      <Toaster />
    </div>
  );
}

export default SDKContent;
