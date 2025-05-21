export type TabType = {
  title: string;
  path: string;
  pathName: string;
  subtabs: SubTabType[];
};

export type SubTabType = {
  title: string;
  path: string;
};
