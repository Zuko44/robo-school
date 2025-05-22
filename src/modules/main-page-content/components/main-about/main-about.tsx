import { Container } from '@/components/container';

import styles from './main-about.module.scss';

const aboutItems = [
  {
    id: 1,
    count: 10,
    description: 'УМК по различным направлениям по робототехнике',
  },
  {
    id: 2,
    count: 20,
    description: 'Школ, в которых запущена робототехника',
  },
  {
    id: 3,
    count: 100,
    description: 'Педагогов прошедших курсы повышения квалификации',
  },
  {
    id: 4,
    count: 10000,
    description: 'Обученных детей на базе собственных центров',
  },
];

export const MainAbout = () => {
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.wrapper}>
          <p className={styles.text}>
            <b>Robo School</b> – учреждение для формирования кадрового педагогического резерва в
            сфере робототехники и программирования
          </p>
          <div className={styles.items}>
            {aboutItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <span className={styles.number}>{item.count}</span>
                <span className={styles.description}>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
