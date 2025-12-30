interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onRestart: () => void;
}

import { FaCheckCircle } from 'react-icons/fa';

function Result({
  data,
  // onRestart
}: Props) {
  console.log(data);

  return (
    <div className="sdk-view-result">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
            <FaCheckCircle size={32} color="#FFFFFF" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-2 text-primary">
          Verification Complete
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your documents have been successfully scanned
        </p>
      </div>
    </div>
  );
}

export default Result;
