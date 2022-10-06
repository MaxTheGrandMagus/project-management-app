import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  showModal: boolean;
};

const ReactPortal: FC<Props> = (props) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflow = 'hidden';
    }
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
      document.body.style.overflow = 'unset';
    };
  }, [modalRoot, el, props.showModal]);

  return createPortal(
    <>
      {/* window-container */}
      <div
        className="window-container overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex justify-center items-center outline-none focus:outline-none"
      >
        {/* modal-container */}
        <div className="modal-container w-auto max-w-3xl mx-auto my-6">
          {/* modal */}
          {props.children} 
        </div>
      </div>
      {/* overlay */}
      <div className="overlay fixed opacity-25 inset-0 z-40 bg-black"></div>
    </>,
    el
  );
};

export default ReactPortal;
