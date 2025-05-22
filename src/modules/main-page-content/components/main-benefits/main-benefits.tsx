import { Container } from '@/components/container';
import type { BenefitItemsType } from '@/types/benefits';

import styles from './main-benefits.module.scss';

// eslint-disable-next-line no-unused-vars
const benefitItems: BenefitItemsType = [
  {
    id: 1,
    subtitle: 'Удостоверение',
    description:
      'Дающее право преподавать робототехнику для детей 6-12 лет в образовательных учреждениях',
  },
  {
    id: 2,
    subtitle: 'Знания',
    description:
      'По основам разработки учебно-методических комплексов по робототехнике и программированию',
  },
  {
    id: 3,
    subtitle: 'Практику ',
    description:
      'Возможность пройти практику по преподаванию робототехники на базе R:ED LAB (в оффлайн или онлайн формате)',
    tooltip: 'При наличии свободных мест',
  },
];

export const MainBenefits = () => {
  return (
    <section className={styles.benefits}>
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Что вы получите после курса</h2>
          <div className={styles.items}>{/*Здесь должны быть отрисованы элементы*/}</div>
        </div>
      </Container>
    </section>
  );
};
