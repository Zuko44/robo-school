import { Container } from '@/components/container';
import { BenefitItem } from '@/modules/main-page-content/components/main-benefits/components/benefit-item/benefit-item';
import type { BenefitItemsType } from '@/types/benefits';

import styles from './main-benefits.module.scss';

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
          <div className={styles.items}>
            {benefitItems.map((item) => (
              <BenefitItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
