/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { button } from '@shared/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   // DialogTrigger,
// } from '@shared/components/ui/dialog';
import { useMemo } from 'preact/hooks';
import { MODULE_TYPE } from './constant';
// import { useMemo } from 'react';
import EkycSDK from './EkycSDK';
import { Modal } from '@shared/components/Modal/BaseModal';
// import EkycSDK from './EkycSDK';

type EkycDIalogProps = {
  moduleType: MODULE_TYPE | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function EkycDialog(props: EkycDIalogProps) {
  const { moduleType, open, setOpen } = props;

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
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Heading>
          <p>EKYC Verif {moduleType}y</p>
        </Modal.Heading>
        <Modal.Body>
          <EkycSDK config={config} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
