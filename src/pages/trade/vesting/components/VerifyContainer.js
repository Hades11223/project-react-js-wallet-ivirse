import { IvirseLogo, SecurityUser } from "@assets/svg";
import snackbarUtils from "@utils/snackbar-utils";
import { Button } from "antd";
import React from "react";
import { VerifyContainerWrapper } from "./styled";

const VerifyContainer = ({ initTimeLockOwnership, loading, setLoading }) => {
  return (
    <VerifyContainerWrapper>
      <div className="loading-container">
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
          initTimeLockOwnership()
            .then((res) => {
              snackbarUtils.success("Verify successfully!!!");
            })
            .catch((err) => {
              if (err == 1) {
                snackbarUtils.error("Please change your network!");
              } else if (err == 2) {
                snackbarUtils.error(
                  "You are not in whitelist, please check your wallet address!"
                );
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
