import { ShieldCheck, ScanFace, CreditCard, ChevronRight } from 'lucide-react';
import { useState } from 'preact/hooks';
import { MODULE_TYPE } from './constant';
import { EkycDialog } from './EkycDialog';

function App() {
  const [open, setOpen] = useState(false);
  const [moduleType, setModuleType] = useState<MODULE_TYPE | null>(null);

  const handleClick = (moduleType: MODULE_TYPE) => {
    setOpen(true);
    setModuleType(moduleType);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-base-200 p-6">
      {/* Decorative Background - Using 'bg-primary' with opacity */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-8">
        {/* Heading Section */}
        <div className="space-y-3 text-center">
          <div className="badge badge-primary badge-outline font-semibold">
            Identity Ekyc
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
            Verify Identity
          </h1>
          <p className="mx-auto max-w-xs text-base text-base-content/70">
            Choose a specialized module to begin your automated verification
            flow.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid gap-4">
          {/* Card: OCR + Liveness (Secondary Theme) */}
          <button
            onClick={() => handleClick(MODULE_TYPE.OCR_LIVE_NESS)}
            className="group flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 text-left transition-all hover:border-secondary hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
              <CreditCard size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base-content">OCR + Liveness</h3>
              <p className="text-sm text-base-content/60">
                Extract data and detect spoofing
              </p>
            </div>
            <ChevronRight
              className="text-base-content/20 group-hover:text-secondary"
              size={20}
            />
          </button>

          {/* Card: Liveness (Accent Theme) */}
          <button
            onClick={() => handleClick(MODULE_TYPE.LIVE_NESS)}
            className="group flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 text-left transition-all hover:border-accent hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-content transition-colors">
              <ShieldCheck size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base-content">Liveness Only</h3>
              <p className="text-sm text-base-content/60">
                Fast 3D biometric check
              </p>
            </div>
            <ChevronRight
              className="text-base-content/20 group-hover:text-accent"
              size={20}
            />
          </button>

          {/* Card: Face Matching (Primary Theme) */}
          <button
            onClick={() => handleClick(MODULE_TYPE.FACE_MATCHING)}
            className="group flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 text-left transition-all hover:border-primary hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
              <ScanFace size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base-content">Face Matching</h3>
              <p className="text-sm text-base-content/60">
                Compare selfie with ID document
              </p>
            </div>
            <ChevronRight
              className="text-base-content/20 group-hover:text-primary"
              size={20}
            />
          </button>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-base-content/40">
          Secure, encrypted, and GDPR compliant.
        </p>
      </div>

      <EkycDialog
        open={open}
        moduleType={moduleType}
        setOpen={(val) => {
          setOpen(val);
          if (!val) setModuleType(null);
        }}
      />
    </div>
  );
}

export default App;
