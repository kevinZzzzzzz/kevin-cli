import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useTitle = (title: string) => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t(title);
  }, []);
  return;
};

export default useTitle;
