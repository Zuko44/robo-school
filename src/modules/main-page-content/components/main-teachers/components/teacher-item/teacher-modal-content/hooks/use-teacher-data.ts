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
    setState({ teacher: null, loading: true, error: null });

    getTeacherById(teacherId)
      .then((data) => setState({ teacher: data, loading: false, error: null }))
      .catch(() =>
        setState({ teacher: null, loading: false, error: 'Не удалось загрузить данные' }),
      );
  }, [teacherId]);

  return state;
};
