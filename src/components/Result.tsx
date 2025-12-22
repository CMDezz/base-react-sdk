import Button from "./base/BaseButton";

interface Props {
  data: any;
  onRestart: () => void;
}

function Result({ data, onRestart }: Props) {
  return (
    <div className="sdk-view-result">
      <h3>Scan Results</h3>
      <div
        style={{
          background: "#f9f9f9",
          padding: "1rem",
          borderRadius: 4,
          margin: "1rem 0",
        }}
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Button onClick={onRestart}>Done</Button>
    </div>
  );
}

export default Result;
