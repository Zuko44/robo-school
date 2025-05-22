import { useContext } from 'react';

import { Container } from '@/components/container';
import { MainPageContext } from '@/store/main-page';

import styles from './main-teachers.module.scss';

export const MainTeachers = () => {
  const teachers = useContext(MainPageContext);

  console.log(teachers);

  return (
    <section className={styles.teachers}>
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Профессиональные тренеры</h2>
        </div>
      </Container>
    </section>
  );
};
