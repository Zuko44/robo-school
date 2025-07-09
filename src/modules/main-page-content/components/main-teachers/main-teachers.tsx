import { useContext, useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/container';
import { useWindowSize } from '@/hooks/useWindowSize';
import { MainPageContext } from '@/store/main-page';

import { SliderNavigation } from './components/slider-navigation';
import { TeacherItem } from './components/teacher-item';

import styles from './main-teachers.module.scss';

export const MainTeachers = () => {
  const { teachersList } = useContext(MainPageContext);

  const swiperRef = useRef<SwiperType | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      swiperRef.current.scrollbar?.updateSize();
    }
  }, [teachersList]);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const createSliderButtonHandler = (direction: 'next' | 'prev') => () => {
    if (!swiperRef.current) {
      return;
    }

    if (direction === 'next') {
      swiperRef.current.slideNext();
      return;
    }

    swiperRef.current.slidePrev();
  };

  return (
    <section className={styles.teachers}>
      <Container>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Профессиональные тренеры</h2>
          <Swiper
            className={styles.list}
            modules={[Scrollbar]}
            spaceBetween={isMobile ? 20 : 40}
            slidesPerView={isMobile ? 'auto' : 3}
            scrollbar={{ el: scrollbarRef.current!, draggable: true }}
            onBeforeInit={handleSwiperInit}
          >
            {teachersList.map((teacher) => (
              <SwiperSlide key={teacher.id} className={styles.swiperSlide}>
                <TeacherItem teacherItem={teacher} />
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderNavigation
            scrollbarRef={scrollbarRef}
            onPrev={createSliderButtonHandler('prev')}
            onNext={createSliderButtonHandler('next')}
          />
        </div>
      </Container>
    </section>
  );
};
