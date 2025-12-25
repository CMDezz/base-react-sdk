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
        <div className='flex flex-col gap-4'
          style={{
            height: 400,
            overflowY: 'auto',
          }}
        >
          {data.front && (
            <>
              <h3>Front OCR</h3>
              <img class="w-1/3" src={data.front} />
            </>
          )}
          {data.back && (
            <>
              <h3>Back OCR</h3>
              <img class="w-1/3" src={data.back} />
            </>
          )}
          {data.face && (
            <>
              <h3>Face</h3>
              <div className="flex gap-4 w-full flex-wrap">
                {data.face.images.map((face: string, i: number) => {
                  return <img class="w-1/3" src={face} key={i} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <button className="btn" onClick={onRestart}>
        Done
      </button>
    </div>
  );
}

export default Result;
