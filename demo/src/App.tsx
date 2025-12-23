import { Button } from '@shared/components/ui/button';

function App() {
  const handleOption = (option: string) => {
    console.log(`clicked on ${option}`);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Demo Options
          </h1>
          <p className="text-sm text-gray-500">
            Select a verification method to proceed
          </p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full py-6 text-lg shadow-sm transition-all hover:scale-[1.02]"
            onClick={() => handleOption('face matching')}
          >
            Face Matching
          </Button>
          <Button
            className="w-full py-6 text-lg shadow-sm transition-all hover:scale-[1.02]"
            variant="outline"
            onClick={() => handleOption('OCR + live ness')}
          >
            OCR + Liveness
          </Button>
          <Button
            className="w-full py-6 text-lg shadow-sm transition-all hover:scale-[1.02]"
            variant="secondary"
            onClick={() => handleOption('live ness')}
          >
            Liveness
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
