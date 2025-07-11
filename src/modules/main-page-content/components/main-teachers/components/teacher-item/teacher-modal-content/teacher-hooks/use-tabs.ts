import { useEffect, useState } from 'react';

import type { TeacherTabDataType, TeacherType } from '@/types/teacher';
import type { Option } from '@/types/teacher-select';

export const useTabs = (teacher: TeacherType | null) => {
  const EMPTY: Option = { value: '', label: '' };
  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>(EMPTY);
  const [content, setContent] = useState<TeacherTabDataType[]>([]);
  const [tabsError, setTabsError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacher) return;
    if (!teacher.tabs?.length) {
      setTabsError('Нет вкладок у преподавателя');
      return;
    }
    const opts = teacher.tabs.map((t) => ({ value: t.name, label: t.title }));
    setOptions(opts);
  }, [teacher]);

  useEffect(() => {
    if (options.length) setActiveTab(options[0]);
  }, [options]);

  useEffect(() => {
    if (!teacher || !activeTab.value) return;
    const found = teacher.tabs.find((t) => t.name === activeTab.value);
    if (found) setContent(found.data);
  }, [activeTab, teacher]);

  return { options, activeTab, setActiveTab, content, tabsError } as const;
};
