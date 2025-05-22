import type { TeacherListType, TeacherType } from '@/types/teacher';

import data from './teachers.json';

const apiData = data as TeacherType[];

export const getTeachersList = (): Promise<TeacherListType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shortItems = apiData.map(({ id, name, imageSrc, description }) => ({
        id,
        name,
        imageSrc,
        description,
      }));
      resolve(shortItems);
    }, 1000);
  });
};

export const getTeacherById = (id: number): Promise<TeacherType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = apiData.find((item) => item.id === id);

      if (item) {
        resolve(item);
        return;
      }

      reject(new Error(`Item with id ${id} not found`));
    }, 1000);
  });
};
