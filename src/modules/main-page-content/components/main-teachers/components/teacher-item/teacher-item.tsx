import { useState } from 'react';

import { teachersImages } from '@/assets/images/index';
import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal';
import type { TeacherListType } from '@/types/teacher';

import { TeacherModalContent } from './teacher-modal-content';

import styles from './teacher-item.module.scss';

interface TeacherItemProps {
  teacherItem: TeacherListType;
}

export const TeacherItem = ({ teacherItem }: TeacherItemProps) => {
  const { id, name, imageSrc, description } = teacherItem;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      <img src={imageSource} alt={name} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <Button variant="text" additionalClassname={styles.button} onClick={handleModalOpen}>
          Подробнее
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <TeacherModalContent teacherId={id} />
      </Modal>
    </div>
  );
};
