import { Container } from '@/components/container';

import styles from './main-form.module.scss';

export const MainForm = () => {
  return (
    <section className={styles.course}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <h2 className={styles.title}>Запишитесь на курс со скидкой 10%</h2>
            <p className={styles.description}>Акция действительна до 10 марта 2022 года</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
