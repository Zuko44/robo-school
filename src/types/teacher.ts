export interface TeacherType {
  id: number;
  name: string;
  imageSrc: string;
  description: string;
  links: TeacherLinkType[];
  tabs: TeacherTabType[];
}

export interface TeacherLinkType {
  href: string;
  imagePath: string;
}

export interface TeacherTabType {
  title: string;
  name: string;
  data: TeacherTabDataType[];
}

export interface TeacherTabDataType {
  title: string;
  text: string[];
}

export type TeacherListType = Omit<TeacherType, 'links' | 'tabs'>;
