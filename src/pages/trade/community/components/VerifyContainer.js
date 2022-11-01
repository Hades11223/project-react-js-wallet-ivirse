import { IvirseLogo, SecurityUser } from "@assets/svg";
import snackbarUtils from "@utils/snackbar-utils";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { VerifyContainerWrapper } from "./styled";

const VerifyContainer = ({ initVestingCommunity, loading, setLoading }) => {
  const generateToken = useDispatch()?.auth?.generateToken;
  const currentContractProperties = useSelector(
    (state) => state?.contracts?.currentContractProperties
  );
  const address = useSelector((state) => state?.contracts?.address);

  return (
    <VerifyContainerWrapper>
      <div className="loading-container">
        {/* <img
          className="logo"
          src={require("@images/ivirse-logo.jpg")}
          alt=""
        /> */}
        <IvirseLogo className="logo" />
      </div>
      <div className="text-container">
        {/* <p className="welcome-text">Welcome to IVIRSE! </p> */}
        {loading ? (
          <p className="verify-text">Verifying your wallet address ...</p>
        ) : (
          <p className="verify-text">Please verify your wallet!</p>
        )}
      </div>
      <Button
        className="linear-button d-flex align-items-center"
        onClick={() => {
          setLoading(true);
          initVestingCommunity()
            .then((res) => {
              localStorage.setItem("role", "user");
              if (res?.isAdmin) {
                generateToken({
                  address,
                  network: currentContractProperties?.name,
                });
              }
              if (res.isParticipant) {
                snackbarUtils.success("You have successfully authenticated!");
              } else {
                snackbarUtils.error(
                  "Sorry, you are not currently participating in any campaigns!"
                );
              }
            })
            .catch((err) => {
              if (err == 1) {
                snackbarUtils.error("Please change your network!");
              } else {
                snackbarUtils.error("Verify error!");
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <SecurityUser className="mr-2" />
        Click to verify your wallet
      </Button>
    </VerifyContainerWrapper>
  );
};

export default VerifyContainer;
