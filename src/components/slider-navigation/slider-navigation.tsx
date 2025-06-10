import type { MutableRefObject } from 'react';

import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon';

import styles from './slider-navigation.module.scss';

interface ControlsProps {
  scrollbarRef: MutableRefObject<HTMLDivElement | null>;
  onPrev: () => void;
  onNext: () => void;
}

export const SliderNavigation = ({ scrollbarRef, onPrev, onNext }: ControlsProps) => {
  return (
    <div className={styles.navigations}>
      <div className={`${styles.scrollbar} swiper-scrollbar`} ref={scrollbarRef} />
      <div className={styles.navigationsArrows}>
        <div className={styles.navigationsArrow} onClick={onPrev}>
          <ArrowLeftIcon />
        </div>
        <div className={styles.navigationsArrow} onClick={onNext}>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};
