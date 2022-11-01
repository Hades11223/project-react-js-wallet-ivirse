import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

const WithERC20 = ({ Component, ...props }) => {
  return <Component {...props} />;
};

const mapStateToProps = ({ contracts, global }) => ({
  ...global,
  ...contracts,
});

const mapDispatchToProps = ({ contracts, global }) => ({
  ...global,
  ...contracts,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(WithERC20));
