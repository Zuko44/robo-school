import { type ReactNode, useRef,useState } from 'react';

import styles from './tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  return (
    <div className={styles.wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && <span className={styles.tooltip}>{text}</span>}
    </div>
  );
};
