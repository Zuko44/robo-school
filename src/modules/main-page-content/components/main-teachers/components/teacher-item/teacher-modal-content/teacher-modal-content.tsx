import { useEffect, useState } from 'react';

import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { TeacherTabDataType } from '@/types/teacher';

import type { Option } from '../../../../../../../types/tab-option';
import { SocialLinks } from '../components/links';
import { Tabs } from '../components/tabs';
import { useTeacherData } from './hooks/use-teacher-data';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentProps {
  teacherId: number;
}

export const TeacherModalContent = ({ teacherId }: TeacherModalContentProps) => {
  const { teacher, loading, error } = useTeacherData(teacherId);
  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>({ value: '', label: '' });
  const [content, setContent] = useState<TeacherTabDataType[]>([]);

  useEffect(() => {
    if (!teacher) {
      return;
    }

    const opts = teacher.tabs.map((tab) => ({ value: tab.name, label: tab.title }));
    setOptions(opts);

    if (opts.length > 0) {
      setActiveTab(opts[0]);
      setContent(teacher.tabs[0].data);
    }

    if (!opts.length) {
      setActiveTab({ value: '', label: '' });
      setContent([]);
    }
  }, [teacher]);

  useEffect(() => {
    if (!teacher || !activeTab.value) {
      return;
    }
    const tab = teacher.tabs.find((tab) => tab.name === activeTab.value);
    if (tab) {
      setContent(tab.data);
    }
  }, [activeTab, teacher]);

  const { isMobile } = useWindowSize();

  if (loading) {
    return (
      <div className={styles.loaderOverlay}>
        <div className={styles.loaderContent}>Загрузка...</div>
      </div>
    );
  }

  if (error || !teacher) {
    return <div>{error ?? 'Нет данных'}</div>;
  }

  const { name, description, imageSrc, links } = teacher;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  const handleTabChange = (tabOrValue: Option | string) => {
    const matched =
      typeof tabOrValue === 'string'
        ? options.find((option) => option.value === tabOrValue)
        : tabOrValue;

    if (matched) {
      setActiveTab(matched);
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
