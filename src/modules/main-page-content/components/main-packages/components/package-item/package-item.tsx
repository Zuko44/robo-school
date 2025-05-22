import type { PackageItemType } from '@/types/packages';

import styles from './package-item.module.scss';

interface PackageItemProps {
  package: PackageItemType;
}

export const PackageItem = ({ package: { id, title, price, description } }: PackageItemProps) => {
  return (
    <div key={id} className={styles.packageItem}>
      <h3 className={styles.packageTitle}>{title}</h3>
      <div className={styles.packageText}>
        <span className={styles.packagePrice}>{price}</span>
        <span className={styles.packageDescription}>{description}</span>
      </div>
    </div>
  );
};
