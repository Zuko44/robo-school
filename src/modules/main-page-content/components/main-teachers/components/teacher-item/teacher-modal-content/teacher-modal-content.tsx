import { useTeacherData } from './hooks/use-teacher-data';
import { TeacherModalContentView } from './teacher-modal-content-view';

import styles from './teacher-modal-content.module.scss';

interface TeacherModalContentProps {
  teacherId: number;
}

export const TeacherModalContent = ({ teacherId }: TeacherModalContentProps) => {
  const { teacher, loading, error } = useTeacherData(teacherId);

  return (
    <div className={styles.teacherContent}>
      <TeacherModalContentView teacherData={teacher} isLoading={loading} error={error} />
    </div>
  );
};
