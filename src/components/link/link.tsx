import type { PropsWithChildren } from 'react';

import styles from './link.module.scss';

interface LinkProps extends PropsWithChildren {
  href: string;
  additionalClassname?: string;
}

export const Link = ({ href, children, additionalClassname }: LinkProps) => {
  const createLinkClassname = () => {
    const baseClassname = `${styles.link}`;

    if (additionalClassname) {
      return `${baseClassname} ${additionalClassname}`;
    }

    return baseClassname;
  };

  return (
    <a href={href} className={createLinkClassname()}>
      {children}
    </a>
  );
};
