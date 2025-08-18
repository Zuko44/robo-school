import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';

import { SocialLinks } from '../components/links';
import { Tabs } from '../components/tabs';
import { useTeacherData } from './hooks/use-teacher-data';
import { useTeacherTabs } from './hooks/use-teacher-tabs';
import type { Option } from './types/tab-option';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentProps {
  teacherId: number;
}

export const TeacherModalContent = ({ teacherId }: TeacherModalContentProps) => {
  const { isMobile } = useWindowSize();

  const { teacher, loading, error } = useTeacherData(teacherId);

  const { options, activeTab, setActiveTab, content: activeContent } = useTeacherTabs(teacher);

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
          {activeContent.map((item, idx) => (
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

      {loading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderContent}>Загрузка...</div>
        </div>
      )}
    </div>
  );
};
