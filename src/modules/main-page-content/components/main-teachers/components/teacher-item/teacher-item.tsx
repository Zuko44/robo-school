import { teachersImages } from '@/assets/images/index';
import { Button } from '@/components/button/button';
import type { TeacherListType } from '@/types/teacher';

import styles from './teacher-item.module.scss';

interface TeacherItemProps {
  teacherItem: TeacherListType;
}

export const TeacherItem = ({ teacherItem }: TeacherItemProps) => {
  const { name, imageSrc, description } = teacherItem;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  return (
    <div className={styles.card}>
      <img src={imageSource} alt={name} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <Button variant="text" additionalClassname={styles.button}>
          Подробнее
        </Button>
      </div>
    </div>
  );
};
