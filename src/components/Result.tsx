interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onRestart: () => void;
}

function Result({ data, onRestart }: Props) {
  return (
    <div className="sdk-view-result">
      <h3>Scan Results</h3>
      <div
        style={{
          background: '#f9f9f9',
          padding: '1rem',
          borderRadius: 4,
          margin: '1rem 0',
        }}
      >
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          {data.face &&
            data.face.images.map((face: string, i: number) => {
              return <img src={face} key={i} />;
            })}
        </pre>
      </div>
      <button className="btn" onClick={onRestart}>
        Done
      </button>
    </div>
  );
}

export default Result;
