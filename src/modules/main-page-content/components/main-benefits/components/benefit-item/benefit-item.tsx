import type { BenefitItemType } from '@/types/benefits';

import { Tooltip } from '@/components/tooltip';

import styles from './benefit-item.module.scss';

export const BenefitItem = ({ subtitle, description, tooltip }: BenefitItemType) => {
  return (
    <div className={styles.benefitItem}>
      <div className={styles.title}>
        {subtitle}
        {tooltip && (
          <Tooltip text={tooltip}>
            <span className={styles.tooltip}>i</span>
          </Tooltip>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
