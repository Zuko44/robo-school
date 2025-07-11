import { useEffect, useState } from 'react';

import { getTeacherById } from '@/api/mock-api';
import type { TeacherType } from '@/types/teacher';

// eslint-disable-next-line no-unused-vars
export const useTeacherData = (id: number, cb?: (l: boolean) => void) => {
  const [state, setState] = useState<{
    teacher: TeacherType | null;
    loading: boolean;
    error: string | null;
  }>({ teacher: null, loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    setState({ teacher: null, loading: true, error: null });
    cb?.(true);

    getTeacherById(id)
      .then((data) => mounted && setState({ teacher: data, loading: false, error: null }))
      .catch(
        () =>
          mounted &&
          setState({ teacher: null, loading: false, error: 'Не удалось загрузить данные' }),
      )
      .finally(() => mounted && cb?.(false));

    return () => {
      mounted = false;
    };
  }, [id, cb]);

  return state;
};
