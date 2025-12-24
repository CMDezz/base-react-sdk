/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@shared/components/ui/dialog';
import { MODULE_TYPE } from './constant';
import { useMemo } from 'react';
import EkycSDK from './EkycSDK';
import { webcamService } from '@sdk/service/WebcamService';
// import EkycSDK from './EkycSDK';

type EkycDIalogProps = {
  moduleType: MODULE_TYPE | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function EkycDialog(props: EkycDIalogProps) {
  const { moduleType, open, setOpen } = props;

  // Use a simple boolean check for visibility
  const handleClose = () => {
    setOpen(false);
    webcamService.stopVideo();
  };

  const config = useMemo<SDKConfig>(() => {
    return {
      core: {
        API_KEY: '123',
        TARGET: 'REACT',
      },
      module: {
        FaceMatching: moduleType === MODULE_TYPE.FACE_MATCHING,
        Liveness: moduleType === MODULE_TYPE.LIVE_NESS,
        OCRAndLiveness: moduleType === MODULE_TYPE.OCR_LIVE_NESS,
      },
    };
  }, [moduleType]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>EKYC Verify {moduleType}</DialogTitle>
          <DialogDescription>
            Please follow the instructions for{' '}
            {moduleType?.toLowerCase().replace('_', ' ')}.
          </DialogDescription>
        </DialogHeader>

        {/* Content Area */}
        <div className="py-4">{<EkycSDK config={config} />}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose} // Added explicit handler
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
