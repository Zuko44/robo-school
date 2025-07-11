import { useEffect, useState } from 'react';

import { getTeacherById } from '@/api/mock-api';
import { teachersImages } from '@/assets/images';
import { Select } from '@/components/select';
import { useWindowSize } from '@/hooks/useWindowSize';
import type { TeacherTabDataType, TeacherType } from '@/types/teacher';

import { SocialLinks } from '../components/links';
import { Tabs } from '../components/tabs';

import styles from './teacher-modal-content.module.scss';

interface Option {
  value: string;
  label: string;
}

interface TeacherModalContentProps {
  teacherId: number;
  // eslint-disable-next-line no-unused-vars
  onLoadingChange?: (loading: boolean) => void;
}

export const TeacherModalContent = ({ teacherId, onLoadingChange }: TeacherModalContentProps) => {
  const { isMobile } = useWindowSize();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<TeacherType | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    onLoadingChange?.(true);

    getTeacherById(teacherId)
      .then((data) => mounted && setTeacher(data))
      .catch(() => mounted && setError('Не удалось загрузить данные'))
      .finally(() => {
        if (mounted) {
          setLoading(false);
          onLoadingChange?.(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [teacherId, onLoadingChange]);

  const EMPTY: Option = { value: '', label: '' };
  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>(EMPTY);
  const [activeContent, setActiveContent] = useState<TeacherTabDataType[]>([]);

  useEffect(() => {
    if (!teacher) return;

    const tabs = teacher.tabs;
    if (!Array.isArray(tabs) || tabs.length === 0) {
      setError('Нет вкладок у преподавателя');
      return;
    }

    const opts = tabs.map((t) => ({ value: t.name, label: t.title }));
    setOptions(opts);
  }, [teacher]);

  useEffect(() => {
    if (options.length) {
      setActiveTab(options[0]);
    }
  }, [options]);

  useEffect(() => {
    if (!teacher || !activeTab) return;
    const found = teacher.tabs.find((t) => t.name === activeTab.value);
    if (found) setActiveContent(found.data);
  }, [activeTab, teacher]);

  if (loading) return <div>Загрузка…</div>;
  if (error || !teacher) return <div>{error ?? 'Нет данных'}</div>;
  if (!teacher.tabs?.length) return <div>Нет вкладок у преподавателя</div>;

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
