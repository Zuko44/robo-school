import type { Option } from '@/types/tab-option';

import styles from './tabs.module.scss';

interface TabsProps {
  tabs: Option[];
  activeTab: string;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (value: string) => void;
  additionalClassname?: string;
}

export const Tabs = ({ tabs, activeTab, onTabClick, additionalClassname }: TabsProps) => {
  const createTabClassName = (value: string) => {
    const baseClass = styles.tab;
    const activeClass = value === activeTab ? styles.active : '';
    return [baseClass, activeClass, additionalClassname].filter(Boolean).join(' ');
  };

  const createTabClickHandler = (value: string) => {
    onTabClick(value);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={createTabClassName(value)}
          onClick={() => createTabClickHandler(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
