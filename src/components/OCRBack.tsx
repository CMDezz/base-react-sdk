import Button from "./base/BaseButton";

interface Props {
  onCapture: (data: any) => void;
  onBack: () => void;
}

function OCRBack({ onCapture, onBack }: Props) {
  const handleCapture = () => {
    // Mock capture data
    onCapture({
      image: "back_img_base64",
      info: "Back side info",
    });
  };

  return (
    <div className="sdk-view-back">
      <h3>Scan Back Side</h3>
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
        Back Camera Preview
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={handleCapture}>Capture Back</Button>
      </div>
    </div>
  );
}

export default OCRBack;
