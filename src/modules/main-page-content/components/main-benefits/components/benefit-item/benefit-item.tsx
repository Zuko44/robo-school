import { Tooltip } from '@/components/tooltip';
import type { BenefitItemType } from '@/types/benefits';

import styles from './benefit-item.module.scss';

interface BenefitItemProps {
  benefitItem: BenefitItemType;
}

export const BenefitItem = ({ benefitItem }: BenefitItemProps) => {
  const { subtitle, description, tooltip } = benefitItem;

  return (
    <div className={styles.benefitItem}>
      <div className={styles.title}>
        {subtitle}
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
