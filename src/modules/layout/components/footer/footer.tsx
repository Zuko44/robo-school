import { Container } from '@/components/container';
import { Logo } from '@/components/logo';
import { PhoneCallButton } from '@/components/phone-call-button';

import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container isWide>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Logo />
            <PhoneCallButton />
          </div>
          <div className={styles.copyright}>© ROBO.SCHOOL</div>
        </div>
      </Container>
    </footer>
  );
};
