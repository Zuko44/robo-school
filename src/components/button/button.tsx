import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  additionalClassname?: string;
  children: ReactNode;
}

const createButtonVariant = (variant: string): string => {
  switch (variant) {
    case 'primary':
      return `${styles.button} ${styles.primary}`;
    case 'secondary':
      return `${styles.button} ${styles.secondary}`;
    case 'text':
      return `${styles.button} ${styles.text}`;
    default:
      return styles.button;
  }
};

export const Button = ({
  variant = 'primary',
  additionalClassname,
  children,
  ...rest
}: ButtonProps) => {
  const baseClass = createButtonVariant(variant);
  const fullClassName = additionalClassname ? `${baseClass} ${additionalClassname}` : baseClass;

  return (
    <button className={fullClassName} {...rest}>
      {children}
    </button>
  );
};
