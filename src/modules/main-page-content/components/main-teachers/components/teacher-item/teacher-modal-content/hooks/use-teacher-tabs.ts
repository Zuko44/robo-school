import { useEffect, useState } from 'react';

import type { TeacherTabDataType, TeacherType } from '@/types/teacher';

import type { Option } from '../types/tab-option';

export const useTeacherTabs = (teacher: TeacherType | null) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [activeTab, setActiveTab] = useState<Option>({ value: '', label: '' });
  const [content, setContent] = useState<TeacherTabDataType[]>([]);

  useEffect(() => {
    if (!teacher || !Array.isArray(teacher.tabs) || teacher.tabs.length === 0) {
      return;
    }

    const opts = teacher.tabs.map((tab) => ({
      value: tab.name,
      label: tab.title,
    }));

    setOptions(opts);
    setActiveTab(opts[0]);
  }, [teacher]);

  useEffect(() => {
    if (!teacher || !activeTab.value) {
      return;
    }
    const found = teacher.tabs.find((tab) => tab.name === activeTab.value);
    if (found) {
      setContent(found.data);
    }
  }, [activeTab, teacher]);

  return { options, activeTab, setActiveTab, content };
};
