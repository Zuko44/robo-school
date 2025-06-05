import { type ReactNode, useState } from 'react';

import { TooltipIcon } from '@/assets/icons/TooltipIcon';

import styles from './tooltip.module.scss';

interface TooltipProps {
  text: string;
  icon?: ReactNode;
}

export const Tooltip = ({ text, icon = <TooltipIcon /> }: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <span
      className={styles.tooltipWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.iconWrapper}>{icon}</span>

      {isTooltipVisible && <span className={styles.tooltip}>{text}</span>}
    </span>
  );
};
