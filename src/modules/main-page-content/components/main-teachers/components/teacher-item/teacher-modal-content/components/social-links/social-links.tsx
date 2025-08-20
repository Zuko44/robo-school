import type { TeacherLinkType } from '@/types/teacher';

import styles from './social-links.module.scss';

interface SocialLinksProps {
  links?: TeacherLinkType[];
}

export const SocialLinks = ({ links }: SocialLinksProps) => {
  if (!links || links?.length === 0) {
    return null;
  }

  const filteredLinks = links.filter(({ imagePath }) => Boolean(imagePath));

  return (
    <div className={styles.socialLinks}>
      {filteredLinks.map(({ href, imagePath }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <img src={imagePath} alt={href} />
        </a>
      ))}
    </div>
  );
};
