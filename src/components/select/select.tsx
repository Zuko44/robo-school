import { useRef, useState } from 'react';

import { ArrowDown } from '@/assets/icons';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import type { Option } from '@/types/tab-option';

import styles from './select.module.scss';

interface SelectProps {
  options: Option[];
  value: Option;
  // eslint-disable-next-line no-unused-vars
  onChange: (option: Option) => void;
  additionalClassname?: string;
}

export const Select = ({ options, value, onChange, additionalClassname }: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectOpen = () => {
    setIsSelectOpen(true);
  };

  const handleSelectClose = () => {
    setIsSelectOpen(false);
  };

  const handleSelectClickBtn = () => {
    if (!isSelectOpen) {
      handleSelectOpen();
      return;
    }
    handleSelectClose();
  };

  const createSelectHandler = (option: Option) => () => {
    onChange(option);
    handleSelectClose();
  };

  useOutsideClick({
    ref: dropdownRef,
    handler: handleSelectClose,
    condition: isSelectOpen,
    exceptElementRef: buttonRef,
  });

  return (
    <div
      className={additionalClassname ? `${styles.select} ${additionalClassname}` : styles.select}
      ref={dropdownRef}
    >
      <button
        ref={buttonRef}
        type="button"
        className={styles.selectBtn}
        onClick={handleSelectClickBtn}
      >
        <span>{value.label}</span>
        <ArrowDown />
      </button>

      {isSelectOpen && (
        <ul className={styles.selectOptions}>
          {options.map((option) => (
            <li className={styles.allSelect} key={option.value}>
              <button
                type="button"
                className={`${styles.selectCurrentOption} ${option.value === value.value ? styles.active : ''}`}
                onClick={createSelectHandler(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
