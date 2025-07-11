import styles from './tabs.module.scss';

interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: TabOption[];
  activeTab: string;
  // eslint-disable-next-line no-unused-vars
  onTabClick: (value: string) => void;
  additionalClassname?: string;
}

export const Tabs = ({ tabs, activeTab, onTabClick, additionalClassname }: TabsProps) => {
  const getTabClassName = (value: string) => {
    const baseClass = styles.tab;
    const activeClass = value === activeTab ? styles.active : '';
    return [baseClass, activeClass, additionalClassname].filter(Boolean).join(' ');
  };

  const handleTabClick = (value: string) => {
    onTabClick(value);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={getTabClassName(value)}
          onClick={() => handleTabClick(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
