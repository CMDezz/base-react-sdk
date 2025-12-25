import { ENUM_STEPS } from '@sdk/utils/constant';
import { useEffect, useState } from 'preact/hooks';

const useStepBySignal = ({
  lastMessage,
}: {
  lastMessage: WsResponse | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<ENUM_STEPS>(
    lastMessage?.current_step as ENUM_STEPS
  );

  useEffect(() => {
    if (lastMessage?.current_step !== undefined) {
      setCurrentStep(lastMessage.current_step as ENUM_STEPS);
      setLoading(false); // Signal received! Stop the DaisyUI spinner.
    }
  }, [lastMessage?.current_step]);

  const nextStep = async (callback: () => void | Promise<void>) => {
    setLoading(true); // Start loading immediately on click
    try {
      await callback();
    } catch (err) {
      console.error('Operation failed:', err);
      setLoading(false); // Only stop loading if the API call itself fails
    }
  };

  return {
    nextStep,
    loading,
    currentStep,
  };
};

export default useStepBySignal;
