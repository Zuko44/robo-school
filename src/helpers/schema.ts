import * as yup from 'yup';

const nameRegex = /^[А-Яа-яЁё\s]+$/;
const phoneRegex = /^(\+7|8)\d{10}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .matches(nameRegex, 'Только русские буквы')
    .min(2, 'Минимум 2 символа'),

  phone: yup
    .string()
    .required('Телефон обязателен')
    .matches(phoneRegex, 'Введите номер телефона в формате: +7XXXXXXXXXX'),

  email: yup.string().required('Email обязателен').matches(emailRegex, 'Введите корректный email'),
});
