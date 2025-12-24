/* eslint-disable @typescript-eslint/no-unused-vars */
// import button from '@shared/components/base/button';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCapture: (data: any) => void;
  onBack: () => void;
}

function OCRBack({ onCapture, onBack }: Props) {
  const handleCapture = () => {
    // Mock capture data
    onCapture({
      image: 'back_img_base64',
      info: 'Back side info',
    });
  };

  return (
    <div className="sdk-view-back">
      <h3>Scan Back Side</h3>
      <div
        style={{
          height: 200,
          background: '#eee',
          margin: '1rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Back Camera Preview
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn" onClick={onBack}>
          Back
        </button>
        <button className="btn" onClick={handleCapture}>
          Capture Back
        </button>
      </div>
    </div>
  );
}

export default OCRBack;
