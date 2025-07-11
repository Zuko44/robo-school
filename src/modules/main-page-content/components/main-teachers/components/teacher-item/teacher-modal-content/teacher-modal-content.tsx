import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';

import { SocialLinks } from '../components/links';
import { Tabs } from '../components/tabs';
import { useTabs } from './teacher-hooks/use-tabs';
import { useTeacherData } from './teacher-hooks/use-teacher-data';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentProps {
  teacherId: number;
  // eslint-disable-next-line no-unused-vars
  onLoadingChange?: (loading: boolean) => void;
}

export const TeacherModalContent = ({ teacherId, onLoadingChange }: TeacherModalContentProps) => {
  const { isMobile } = useWindowSize();

  const { teacher, loading, error } = useTeacherData(teacherId, onLoadingChange);

  const { options, activeTab, setActiveTab, content: activeContent, tabsError } = useTabs(teacher);

  if (loading) return <div>Загрузка…</div>;
  if (error || !teacher) return <div>{error ?? 'Нет данных'}</div>;
  if (tabsError) return <div>{tabsError}</div>;

  const { name, description, imageSrc, links } = teacher;
  const imageSource = teachersImages[imageSrc as keyof typeof teachersImages];

  const handleTabClick = (value: string) => {
    const matched = options.find((o) => o.value === value);
    if (matched) setActiveTab(matched);
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
          <Select options={options} value={activeTab} onChange={(o) => setActiveTab(o)} />
        ) : (
          <Tabs tabs={options} activeTab={activeTab.value} onTabClick={handleTabClick} />
        )}

        <div className={styles.contentBottomTabs}>
          {activeContent.map((item, idx) => (
            <div key={item.title || idx} className={styles.tabContent}>
              {item.title && <h3 className={styles.tabTitle}>{item.title}</h3>}
              {item.text.map((p, i) => (
                <p key={i} className={styles.tabInfo}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
