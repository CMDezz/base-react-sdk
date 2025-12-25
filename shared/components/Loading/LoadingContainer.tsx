import { PropsWithChildren } from 'preact/compat';

interface Props {
  isLoading: boolean;
  tip?: string; // Adding a tip prop like Antd
}

function LoadingContainer({
  children,
  isLoading,
  tip,
}: Props & PropsWithChildren) {
  return (
    <div className="relative inline-block w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[1px] transition-all">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          {tip && (
            <div className="mt-2 text-primary text-sm font-medium">{tip}</div>
          )}
        </div>
      )}

      <div
        className={`transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'}`}
      >
        {children}
      </div>
    </div>
  );
}

export default LoadingContainer;
