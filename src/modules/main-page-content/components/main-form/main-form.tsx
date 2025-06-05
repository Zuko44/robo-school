import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { Input } from '@/components/input';
import { formSchema } from '@/helpers/schema';

import styles from './main-form.module.scss';

type FormValues = {
  name: string;
  phone: string;
  email: string;
};

export const MainForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Форма отправлена:', data);
    reset();
  };

  return (
    <section className={styles.course}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.wrapper}>
            <div className={styles.text}>
              <h2 className={styles.title}>Запишитесь на курс со скидкой 10%</h2>
              <p className={styles.description}>Акция действительна до 10 марта 2022 года</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              register={register}
              name="name"
              placeholder="Введите имя"
              error={errors.name?.message}
            />
            <Input
              register={register}
              name="phone"
              type="tel"
              placeholder="Телефон"
              error={errors.phone?.message}
            />
            <Input
              register={register}
              name="email"
              type="email"
              placeholder="E-mail"
              error={errors.email?.message}
            />

            <Button type="submit" variant="secondary" additionalClassname={styles.buttonMain}>
              Оставить заявку
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
