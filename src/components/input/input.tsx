import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './input.module.scss';

type CommonProps = {
  label?: string;
  error?: string;
  additionalClassname?: string;
};

type ControlledProps = {
  register?: never;
  name?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

type UncontrolledProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  value?: never;
  onChange?: never;
};

type NativeInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps<T extends FieldValues> = (ControlledProps | UncontrolledProps<T>) &
  CommonProps &
  Omit<NativeInputProps, 'name' | 'value' | 'onChange'>;

export function Input<T extends FieldValues>({
  label,
  error,
  additionalClassname,
  register,
  name,
  value,
  onChange,
  placeholder,
  ...rest
}: InputProps<T>) {
  const isControlled = Boolean(onChange);

  const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }

    onChange(event.target.value);
  };

  const inputRegistration = register && name ? register(name) : {};
  const dynamicPropsObject = isControlled
    ? { value, onChange: handleInputValueChange }
    : inputRegistration;

  const buildInputClassname = () => {
    let resultClassname = styles.input;

    if (additionalClassname) {
      resultClassname = `${resultClassname} ${additionalClassname}`;
    }

    if (error) {
      resultClassname = `${resultClassname} ${styles.inputError}`;
    }

    return resultClassname;
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.visuallyHidden}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className={buildInputClassname()}
        {...dynamicPropsObject}
        {...rest}
      />

      {Boolean(error) && (
        <span id={`${name}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
