import { PropsWithChildren, ReactNode } from 'preact/compat';

interface ModalProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
  backdropClose?: boolean;
  closeBtn?: boolean;
  id?: string;
}

// 1. Main Container
const ModalContainer = ({
  children,
  open,
  id,
  onClose,
  backdropClose,
  closeBtn = true,
}: ModalProps) => {
  return (
    <dialog
      id={id}
      className={`modal ${open ? 'modal-open' : ''}`}
      open={open}
      onClose={onClose}
    >
      <div className="modal-box">
        {closeBtn && <Closebutton />}
        {children}
      </div>
      {backdropClose && <Backdrop />}
    </dialog>
  );
};

// 2. Sub-Components
const Heading = ({ children }: { children: ReactNode }) => (
  <h3 className="font-bold text-lg">{children}</h3>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className="py-4">{children}</div>
);

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="modal-action">
    <form method="dialog">{children}</form>
  </div>
);

// const ActionsClose = ({ children }: { children: ReactNode }) => (
//   <div className="modal-action">
//     <form method="dialog">{children}</form>
//   </div>
// );

const Closebutton = () => (
  <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
      ✕
    </button>
  </form>
);

const Backdrop = () => (
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
);

export const Modal = Object.assign(ModalContainer, {
  Heading,
  Body,
  Actions,
  Closebutton,
  Backdrop,
});
