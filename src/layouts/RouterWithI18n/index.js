import { withTranslation } from "react-i18next";

const RouterWithI18n = ({ components, ...props }) => {
  return <components {...props} />;
};

export default withTranslation()(RouterWithI18n);
