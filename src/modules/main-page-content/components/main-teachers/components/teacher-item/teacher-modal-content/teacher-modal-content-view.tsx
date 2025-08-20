import { useEffect, useState } from 'react';

import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { Option } from '@/types/tab-option';
import type { TeacherTabDataType, TeacherType } from '@/types/teacher';

import { SocialLinks } from './components/social-links';
import { Tabs } from './components/tabs';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentViewProps {
  teacherData: TeacherType | null;
  isLoading: boolean;
  error: string | null;
}

export const TeacherModalContentView = ({
  teacherData,
  isLoading,
  error,
}: TeacherModalContentViewProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>();
  const [content, setContent] = useState<TeacherTabDataType[]>([]);

  useEffect(() => {
    if (!teacherData) {
      return;
    }

    const newOptions = teacherData.tabs.map((tabItem) => {
      return {
        value: tabItem.name,
        label: tabItem.title,
      };
    });
    setOptions(newOptions);
  }, [teacherData]);

  useEffect(() => {
    if (!options.length) {
      return;
    }

    setActiveTab(options[0]);
  }, [options]);

  useEffect(() => {
    if (!activeTab) {
      return;
    }

    const tabData = teacherData?.tabs.find((tab) => {
      return tab.name === activeTab.value;
    });
    if (!tabData) {
      return;
    }

    setContent(tabData.data);
  }, [activeTab]);

  const { isMobile } = useWindowSize();

  if (isLoading) {
    return <div className={styles.loaderContent}>Загрузка...</div>;
  }

  if (error || !teacherData) {
    return <div>{error || 'Нет данных'}</div>;
  }

  const { name, description, imageSrc, links } = teacherData;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  const handleTabChange = (tab: Option) => {
    setActiveTab(tab);
  };

  return (
    <>
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
          <Tabs tabs={options} activeTab={activeTab?.value} onTabClick={handleTabChange} />
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
    </>
  );
};
