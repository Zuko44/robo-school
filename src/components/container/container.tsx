import type { PropsWithChildren } from 'react';

import styles from './container.module.scss';

interface ContainerProps extends PropsWithChildren {
  isWide?: boolean;
}

export const Container = ({ children, isWide }: ContainerProps) => {
  const createContainerClassname = () => {
    const baseClassname = styles.container;

    if (isWide) {
      return `${baseClassname} ${styles.wide}`;
    }

    return baseClassname;
  };

  return <div className={createContainerClassname()}>{children}</div>;
};
