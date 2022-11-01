import React from "react";
import { connect } from "react-redux";
import Claim from "./components/Claim";
import VerifyContainer from "./components/VerifyContainer";
import { VestingToolWrapper } from "./styled";
const VestingTool = ({
  initTimeLockOwnership,
  loading,
  timeLockOwnerShipObj,
  data,
  releaseTimeLockOwnership,
  pieData,
  seedTokenCanClaim,
  privateTokenCanClaim,
  releasePrivateToken,
  releasePublicToken,
  releasePublicTokenByIndex,
  releasePrivateByIndex,
  show,
  setLoading,
}) => {
  console.log(pieData,"piedata");
  return (
    <VestingToolWrapper>
      {!show ? (
        <VerifyContainer
          initTimeLockOwnership={initTimeLockOwnership}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <Claim
          pieData={pieData}
          data={data}
          releaseTimeLockOwnership={releaseTimeLockOwnership}
          seedTokenCanClaim={seedTokenCanClaim}
          privateTokenCanClaim={privateTokenCanClaim}
          releasePrivateToken={releasePrivateToken}
          releasePublicToken={releasePublicToken}
          releasePublicTokenByIndex={releasePublicTokenByIndex}
          releasePrivateByIndex={releasePrivateByIndex}
        />
      )}
    </VestingToolWrapper>
  );
};

const mapStateToProps = ({
  contracts: { address },
  vesting: {
    timeLockWithSigner,
    timeLockOwnerShipObj,
    data,
    pieData,
    seedTokenCanClaim,
    privateTokenCanClaim,
    show,
  },
  global: { loading },
}) => ({
  timeLockWithSigner,
  timeLockOwnerShipObj,
  data,
  pieData,
  seedTokenCanClaim,
  privateTokenCanClaim,
  show,
  loading,
  address,
});

const mapDispatchToProps = ({
  vesting: {
    init,
    addInvestor,
    release,
    setTimesAndRate,
    start,
    reStart,
    releasePrivateToken,
    releasePublicToken,
    initTimeLockOwnership,
    releasePublicTokenByIndex,
    releasePrivateByIndex,
  },
}) => ({
  init,
  addInvestor,
  release,
  setTimesAndRate,
  start,
  reStart,
  releasePrivateToken,
  releasePublicToken,
  initTimeLockOwnership,
  releasePublicTokenByIndex,
  releasePrivateByIndex,
});
export default connect(mapStateToProps, mapDispatchToProps)(VestingTool);
