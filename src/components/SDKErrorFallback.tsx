/* eslint-disable @typescript-eslint/no-unused-vars */
import { SDKError } from '@sdk/utils/errors';

type Props = {
  context: SDKContext;
  err: SDKError;
  resetErrorBoundary?: () => void;
};

const SDKErrorFallback = ({ err, resetErrorBoundary }: Props) => {
  // Check if it's your custom error to access the 'recoverable' property
  const isRecoverable = err instanceof SDKError ? err.recoverable : false;
  return (
    <div className="flex items-center justify-center p-6 w-full min-h-[300px] border-red-600 rounded-lg">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">SDK Error!</h2>
          <p>
            Detail:
            {err.message}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-warning">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKErrorFallback;
