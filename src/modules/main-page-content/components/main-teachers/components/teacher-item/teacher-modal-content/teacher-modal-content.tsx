import { useEffect, useState } from 'react';

import { getTeacherById } from '@/api/mock-api';
import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { TeacherTabDataType, TeacherType } from '@/types/teacher';

import { SocialLinks } from '../components/links';
import { Tabs } from '../components/tabs';
import type { Option } from './types/tab-option';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentProps {
  teacherId: number;
}

export const TeacherModalContent = ({ teacherId }: TeacherModalContentProps) => {
  const { isMobile } = useWindowSize();

  const [state, setState] = useState<{
    teacher: TeacherType | null;
    loading: boolean;
    error: string | null;
  }>({ teacher: null, loading: true, error: null });

  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>({ value: '', label: '' });
  const [content, setContent] = useState<TeacherTabDataType[]>([]);

  useEffect(() => {
    let mounted = true;

    setState({ teacher: null, loading: true, error: null });

    getTeacherById(teacherId)
      .then((data) => {
        if (!mounted) {
          return;
        }

        const tabs = data.tabs ?? [];
        const opts = tabs.map((tab) => ({ value: tab.name, label: tab.title }));

        setOptions(opts);
        setActiveTab(opts[0]);

        setState({ teacher: data, loading: false, error: null });
      })
      .catch(
        () =>
          mounted &&
          setState({ teacher: null, loading: false, error: 'Не удалось загрузить данные' }),
      );

    return () => {
      mounted = false;
    };
  }, [teacherId]);

  useEffect(() => {
    if (!state.teacher || !activeTab.value) {
      return;
    }
    const tab = state.teacher.tabs.find((t) => t.name === activeTab.value);
    if (tab) {
      setContent(tab.data);
    }
  }, [activeTab, state.teacher]);

  if (state.loading) {
    return (
      <div className={styles.loaderOverlay}>
        <div className={styles.loaderContent}>Загрузка...</div>
      </div>
    );
  }

  if (state.error || !state.teacher) {
    return <div>{state.error ?? 'Нет данных'}</div>;
  }

  const { name, description, imageSrc, links } = state.teacher;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  const handleTabChange = (tabOrValue: Option | string) => {
    if (typeof tabOrValue === 'string') {
      const matched = options.find((option) => option.value === tabOrValue);
      if (matched) {
        setActiveTab(matched);
      }
    } else {
      setActiveTab(tabOrValue);
    }
  };

  return (
    <div className={styles.teacherContent}>
      <div className={styles.content}>
        <img className={styles.contentImg} src={imageSource} alt={name} />
        <div className={styles.contentInfo}>
          <h3 className={styles.contentTitle}>{name}</h3>
          <p className={styles.contentUnderTitle}>{description}</p>
          {links && <SocialLinks links={links} />}
        </div>
      </div>

      <div className={styles.contentBottom}>
        {isMobile ? (
          <Select options={options} value={activeTab} onChange={handleTabChange} />
        ) : (
          <Tabs tabs={options} activeTab={activeTab.value} onTabClick={handleTabChange} />
        )}

        <div className={styles.contentBottomTabs}>
          {content.map((item, idx) => (
            <div key={item.title || idx} className={styles.tabContent}>
              {item.title && <h3 className={styles.tabTitle}>{item.title}</h3>}
              {item.text.map((description, index) => (
                <p key={index} className={styles.tabInfo}>
                  {description}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
