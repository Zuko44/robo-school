import { teachersImages } from '@/assets/images/index';
import { Button } from '@/components/button/button';
import type { TeacherListType } from '@/types/teacher';

import styles from './teacher-item.module.scss';

export const TeacherItem = ({ name, imageSrc, description }: TeacherListType) => {
  const images = teachersImages[imageSrc as keyof typeof teachersImages];

  return (
    <div className={styles.card}>
      <img src={images} alt={name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <Button variant="text" additionalClassname={styles.button}>
          Подробнее
        </Button>
      </div>
    </div>
  );
};
