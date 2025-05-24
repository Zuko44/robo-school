import styles from './phone-call-button.module.scss';

export const PhoneCallButton = () => {
  return (
    <a href="tel:88000001122" className={styles.phoneCall}>
      +7 800 000 11 22
    </a>
  );
};
