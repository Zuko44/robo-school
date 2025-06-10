import { useContext, useEffect, useRef } from 'react';
import { Scrollbar } from 'swiper/modules';
import { Container } from '@/components/container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MainPageContext } from '@/store/main-page';
import 'swiper/css';
import styles from './main-teachers.module.scss';
import { TeacherItem } from '@/components/teacher-item/teacher-item';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { Swiper as SwiperType } from 'swiper';
import { SliderNavigation } from '@/components/slider-navigation';

export const MainTeachers = () => {
  const { teachersList } = useContext(MainPageContext);
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      swiperRef.current.scrollbar?.updateSize();
    }
  }, [teachersList]);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const handleSlide = (direction: 'next' | 'prev') => () => {
    if (!swiperRef.current) return;
    direction === 'next' ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
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
                <TeacherItem {...teacher} />
              </SwiperSlide>
            ))}
          </Swiper>

          <SliderNavigation
            scrollbarRef={scrollbarRef}
            onPrev={handleSlide('prev')}
            onNext={handleSlide('next')}
          />
        </div>
      </Container>
    </section>
  );
};
