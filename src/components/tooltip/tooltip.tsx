import { type ReactNode, useRef, useState } from 'react';

import styles from './tooltip.module.scss';
import { TooltipIcon } from '@/assets/icons/TooltipIcon';

interface TooltipProps {
  text: string;
  icon?: ReactNode;
}

export const Tooltip = ({ text, icon }: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsTooltipVisible(false), 150);
  };

  return (
    <span
      className={styles.componentWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon || <TooltipIcon />}
      {text && isTooltipVisible && <span className={styles.tooltip}>{text}</span>}
    </span>
  );
};
