import { WrongLine } from "@assets/animation";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { IviIcon, Metamask } from "@svg";
import { getLengthAddress } from "@utils";
import snackbarUtils from "@utils/snackbar-utils";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearText from "../../../components/LinearText";
import { LinearButton } from "../../../components/styled";
import { UserWrapper } from "./styled";
import ViewDetail from "./ViewDetail";

const UserContainer = () => {
  const viewRef = useRef();
  const address = useSelector((state) => state?.contracts?.address);
  const tokenCanClaim = useSelector((state) => state?.community?.tokenCanClaim);
  const getTokenCanClaim = useDispatch()?.community?.getTokenCanClaim;
  const claimToken = useDispatch()?.community?.claimToken;

  useEffect(() => {
    if (address) {
      getTokenCanClaim(address);
    }
  }, [address]);

  const wsw = window.screen.width;

  return (
    <UserWrapper>
      <div className="title-text">
        <LinearText
          title="Community"
          fontSize={wsw > 460 ? "50px" : "40px"}
          lineHeight={wsw > 460 ? "50px" : "40px"}
        />
      </div>
      <div className="content">
        <div className="content__header">
          <div className="content__header__icon">
            <IviIcon width="24px" height="27px" />
          </div>
          <div className="content__header__text">Claim IVI Token</div>
        </div>
        <div className="content__explain">
          <p>
            Below is number of IVI Tokens from All Campain airdrop linked to the
            address that will be claimable on/ after the day of token issuance
          </p>
          <p className="content__explain__detail">
            <span>
              Would you want to know more about total tokens you have?
            </span>
            <span
              className="content__explain__detail--blue"
              onClick={() => {
                viewRef?.current?.show({
                  balance: tokenCanClaim,
                });
              }}
            >
              View detail
            </span>
          </p>
        </div>
        <div className="content__display__claim">
          <div className="content__display__claim__account">
            <div className="content__display__claim__account__icon">
              <Metamask />
            </div>
            <div className="content__display__claim__account__wallet">
              <div>Metamask Wallet</div>
              <AddressTooltip
                address={address}
                getLengthAddress={getLengthAddress(address, window.innerWidth)}
              />
            </div>
          </div>
          <div className="content__display__claim__token">
            <label>Total Claim Token</label>
            <p>
              <span className="balance">{tokenCanClaim}</span>
              <span className="symbol"> IVI</span>
            </p>
          </div>
        </div>
        <div className="content__submit">
          <LinearButton
            disabled={!tokenCanClaim}
            onClick={() => {
              claimToken(address, tokenCanClaim)
                .then(() => {
                  snackbarUtils.success("Claim success!");
                })
                .catch((err) => {
                  console.log(err);
                  snackbarUtils.error("Claim fail!", <WrongLine />);
                })
                .finally((err) => {
                  getTokenCanClaim(address);
                });
            }}
          >
            Claim
          </LinearButton>
        </div>
      </div>
      <ViewDetail ref={viewRef} />
    </UserWrapper>
  );
};

export default UserContainer;
