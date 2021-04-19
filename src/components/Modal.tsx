import React from "react";
import ReactDom from "react-dom";
import "../styles/modal.scss";
import { AiOutlineCloseSquare } from "react-icons/ai";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  includeX?: boolean; //include the X button at the top for closing the modal?
  id?: string; //optional id for modal dialog
};

const modalRoot = document.getElementById("portal") as HTMLElement;

const Modal = ({ children, open, onClose, includeX, id }: ModalProps) => {
  if (open) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return ReactDom.createPortal(
      <>
        <div className={"modal-overlay"} onClick={onClose} />
        <div className={"modal-dialog"} id={id}>
          <div className={"modal-body"}>
            {(includeX === undefined || includeX) && (
              <AiOutlineCloseSquare id={"modal-close"} onClick={onClose} />
            )}
            {children}
          </div>
        </div>
      </>,
      modalRoot
    );
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
  return null;
};

export default Modal;
