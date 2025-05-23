import type { PropsWithChildren } from 'react';

import { Footer } from '@/modules/layout/components/footer';
import { Header } from '@/modules/layout/components/header';

import styles from './layout.module.scss';

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
