import { createContext } from 'react';

import type { TeacherListType } from '@/types/teacher';

interface MainPageContextProps {
  teachersList: TeacherListType[] | [];
}

export const MainPageContext = createContext<MainPageContextProps>({
  teachersList: [],
});
