import { type PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { CloseIconDark } from '@/assets/icons/CloseIconDark';
import { useScrollLock } from '@/hooks/useScrollLock';

import styles from './modal.module.scss';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      return;
    }

    unlockScroll();

    return () => {
      unlockScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleModalClose = () => {
    onClose();
  };

  const modalContent = (
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={handleModalClose} />
      <div className={styles.modalContent}>
        {children}
        <button
          className={styles.modalClose}
          ref={closeButtonRef}
          onClick={handleModalClose}
          aria-label="Закрыть"
        >
          <CloseIconDark />
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
