const OCRSelector = ({
  onSelection,
}: {
  onSelection: (option: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <button
        className="btn btn-primary btn-outline"
        onClick={() => onSelection('Identification Card')}
      >
        Identification Card
      </button>
      <button
        className="btn btn-primary btn-outline"
        onClick={() => onSelection('Driver License')}
      >
        Driver License
      </button>
      <button
        className="btn btn-primary btn-outline"
        onClick={() => onSelection('Passport')}
      >
        Passport
      </button>
    </div>
  );
};

export default OCRSelector;
