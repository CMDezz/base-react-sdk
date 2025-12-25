import clsx from 'clsx';
import { HTMLAttributes } from 'preact';
import { ReactNode } from 'preact/compat';
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
interface DivProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
  backdropClose?: boolean;
  closeBtn?: boolean;
  id?: string;
  className?: string;
}

// 1. Main Container
const ModalContainer = ({
  children,
  open,
  id,
  onClose,
  backdropClose,
  closeBtn = true,
  className,
  ...rest
}: ModalProps) => {
  return (
    <dialog
      id={id}
      className={clsx(
        'modal',
        {
          'modal-open': open,
        },
        className
      )}
      open={open}
      onClose={onClose}
      {...rest}
    >
      <div className="modal-box">
        {closeBtn && <Closebutton />}
        {children}
      </div>
      {backdropClose && <Backdrop />}
    </dialog>
  );
};

const Heading = ({ children, className, ...rest }: HeadingProps) => (
  <h3
    className={clsx('font-bold text-lg tracking-tight ', className)}
    {...rest}
  >
    {children}
  </h3>
);

const Body = ({ children, className, ...rest }: DivProps) => (
  <div className={clsx('py-4', className)} {...rest}>
    {children}
  </div>
);

const Actions = ({ children, className, ...rest }: DivProps) => (
  <div className={clsx('modal-action', className)} {...rest}>
    <form method="dialog">{children}</form>
  </div>
);

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
