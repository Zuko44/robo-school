import { type PropsWithChildren, type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { CloseIconDark } from '@/assets/icons/CloseIconDark';
import { useScrollLock } from '@/hooks/useScrollLock';

import styles from './modal.module.scss';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  disableClose?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  icon = <CloseIconDark />,
  disableClose,
  children,
}: ModalProps) => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
    unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
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
        {!disableClose && (
          <button className={styles.modalClose} onClick={handleModalClose} aria-label="Закрыть">
            {icon}
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
