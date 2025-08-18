import { useEffect, useState } from 'react';

import { getTeacherById } from '@/api/mock-api';
import type { TeacherType } from '@/types/teacher';

export const useTeacherData = (teacherId: number) => {
  const [state, setState] = useState<{
    teacher: TeacherType | null;
    loading: boolean;
    error: string | null;
  }>({ teacher: null, loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    setState({ teacher: null, loading: true, error: null });

    getTeacherById(teacherId)
      .then((data) => mounted && setState({ teacher: data, loading: false, error: null }))
      .catch(
        () =>
          mounted &&
          setState({ teacher: null, loading: false, error: 'Не удалось загрузить данные' }),
      );

    return () => {
      mounted = false;
    };
  }, [teacherId]);

  return state;
};
