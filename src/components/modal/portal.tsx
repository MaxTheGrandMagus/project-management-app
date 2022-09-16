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

  return createPortal(props.children, el);
};

export default ReactPortal;
