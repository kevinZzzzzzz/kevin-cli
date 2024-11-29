type GeneratedRoute = {
  key: string;
  path: string;
  name: string;
  component?: string;
  layout: string;
  meta: {
    title: string;
    i18nKey?: string;
    order: number;
    icon: string;
    keepAlive?: boolean;
    roles?: string[];
    needShow: boolean;
  };
  children?: GeneratedRoute[];
};

interface IThemeProperty {
  [key: string]: string | number | IThemeProperty;
}
interface IThemeSetting {
  locale: "zh" | "en";
  theme: "light" | "dark";
  header: IThemeProperty;
  tab: IThemeProperty;
  content: IThemeProperty;
  sider: IThemeProperty;
  footer: IThemeProperty;
  tokens: {
    [key: string]: IThemeProperty;
  };
}
