import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  additionalClassname?: string;
  children: ReactNode;
}

function getButtonClassNames(variant: string, extra?: string) {
  return [styles.button, styles[variant], extra].filter(Boolean).join(' ');
}

export const Button = ({
  variant = 'primary',
  additionalClassname,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={getButtonClassNames(variant, additionalClassname)} {...rest}>
      {children}
    </button>
  );
};
