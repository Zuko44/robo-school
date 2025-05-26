import type { ButtonProps } from '@/types/buttons';

import styles from './button.module.scss';

export const Button = ({
  variant = 'primary',
  additionalClassname,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${additionalClassname || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
