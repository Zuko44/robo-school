import { Container } from '@/components/container';
import type { PackageItemsType } from '@/types/packages';

import { PackageItem } from './components/package-item';

import styles from './main-packages.module.scss';

const packageItems: PackageItemsType = [
  {
    id: 1,
    title: 'PRO',
    price: '20.000 ₽',
    description: 'УМК по робототетхнике и программированию',
  },
  {
    id: 2,
    title: 'ROBO',
    price: '15.000 ₽',
    description: 'УМК по робототетхнике',
  },
  {
    id: 3,
    title: 'PROG',
    price: '10.000 ₽',
    description: 'УМК по робототетхнике',
  },
];

export const MainPackages = () => {
  return (
    <section className={styles.package}>
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Выберете нужный пакет</h2>
          <div className={styles.packageList}>
            {packageItems.map((packageItem) => (
              <PackageItem key={packageItem.id} package={packageItem} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
