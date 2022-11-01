import useLocalStorage from "@hook/useLocalStorage";
import React from "react";
import { connect } from "react-redux";
import UserContainer from "./components/user";
import VerifyContainer from "./components/VerifyContainer";
import { CommunityWrapper } from "./styled";
const Community = ({
  initVestingCommunity,
  setLoading,
  loading,
  isParticipant,
  isAdmin,
}) => {
  const data = useLocalStorage("role");

  return (
    <CommunityWrapper className={isAdmin ? "has-admin" : ""}>
      {isParticipant && data && data == "user" ? (
        <UserContainer />
      ) : (
        <VerifyContainer
          initVestingCommunity={initVestingCommunity}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </CommunityWrapper>
  );
};

const mapStateToProps = ({
  community: {
    data,
    isInvestor,
    isAdmin,
    show,
    adminWithConsents,
    investors,
    times,
    isParticipant,
  },
  global: { loading },
}) => ({
  data,
  loading,
  isInvestor,
  show,
  adminWithConsents,
  investors,
  times,
  isParticipant,
  isAdmin,
});
const mapDispatchToProps = ({
  community: {
    initVestingCommunity,
    getAdminData,
    addAccounts,
    getInvestors,
    claimToken,
  },
}) => ({
  initVestingCommunity,
  getAdminData,
  addAccounts,
  getInvestors,
  claimToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(Community);
