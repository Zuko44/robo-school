import { useEffect, useState } from 'react';

import { getTeachersList } from '@/api/mock-api';
import { MainPageContent } from '@/modules/main-page-content';
import { MainPageContext } from '@/store/main-page';
import type { TeacherListType } from '@/types/teacher';

export const MainPage = () => {
  const [teachersList, setTeachersList] = useState<TeacherListType[] | []>([]);

  useEffect(() => {
    getTeachersList()
      .then((data) => setTeachersList(data))
      .catch(console.error);
  }, []);

  return (
    <MainPageContext.Provider value={{ teachersList }}>
      <MainPageContent />
    </MainPageContext.Provider>
  );
};
