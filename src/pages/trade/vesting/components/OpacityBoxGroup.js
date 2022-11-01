import TradeButton from "@components/TradeButton";
import snackbarUtils from "@utils/snackbar-utils";
import React from "react";
import { OpacityBoxGroupWrapper } from "./styled";

const OpacityBoxGroup = ({
  disabled,
  setDisabled,
  releasePublicToken,
  data,
  seedTokenCanClaim,
  // seedAmountIsZero,
  // privateAmountIsZero,
  releasePublicTokenByIndex,
  checkClaimAbleToken,
}) => {
  const seedAmountIsZero = data.every((item) => item?.amountSeed === 0);
  const privateAmountIsZero = data.every((item) => item?.amountPrivate === 0);
  return (
    <OpacityBoxGroupWrapper>
      <div className="claim-all-block opacity-box mb-4">
        <h1>total remaining claimable token</h1>
        <div className="amount-claim-all">
          <strong>{seedTokenCanClaim?.formatCurrency()}</strong>
        </div>
        <TradeButton
          disabled={checkClaimAbleToken}
          parentClassName={"d-flex justify-content-center"}
          className={"d-flex align-items-center"}
          style={{ padding: "24px 48px" }}
          fontSize="20px"
          type={checkClaimAbleToken ? "gray_black" : "green"}
          content={"Claim all"}
          onClick={() => {
            setDisabled(true);

            releasePublicToken(seedTokenCanClaim)
              .then((res) => {
                snackbarUtils.success("Claim successfully!");
              })
              .catch((err) => {
                snackbarUtils.error("The transaction is declined!");
              })
              .finally(() => {
                setDisabled(false);
              });
          }}
        />
      </div>
      <div className="data-block">
        {data?.map((item, index) => (
          <div className="opacity-box d-flex vesting-data justify-content-space-between">
            <div className="data-left">
              <p className="data-item">
                <span>Milestone: {item?.date} </span>
                {/* <span>{" "} {item?.date}</span> */}
              </p>
              {/* {seedAmountIsZero && ( */}
              <p className="data-item">
                <span>Seed</span>
                <span>
                  <strong>{item?.amountSeed?.formatCurrency()}</strong>
                </span>
              </p>
              {/* )} */}
              {/* {privateAmountIsZero && ( */}
              <p className="data-item">
                <span>Private</span>
                <span>
                  <strong>{item?.amountPrivate?.formatCurrency()}</strong>
                </span>
              </p>
              {/* )} */}
            </div>
            <div className="data-right">
              {/* {(seedAmountIsZero || privateAmountIsZero) && ( */}
              <>
                <p className="data-item">
                  <span>Total</span>
                </p>
                <p className="data-item">
                  <span>{item?.total?.formatCurrency()}</span>
                </p>
              </>
              {/* )} */}
              <p className="data-item data-item-gold">
                {item?.total == 0 ? (
                  "Lock"
                ) : item?.status == "1" ? (
                  <span style={{ color: "#FF7A00" }}>Coming soon</span>
                ) : item?.status == "2" ? (
                  <div style={{ color: "#6E5AC3" }}>Claimed</div>
                ) : (
                  <TradeButton
                    parentClassName="d-flex justify-content-center"
                    content={"Claim"}
                    // disabled={disabled}
                    type="gradient"
                    onClick={() => {
                      let api = releasePublicTokenByIndex;
                      setDisabled(true);
                      api(item.index)
                        .then((res) => {
                          snackbarUtils.success("Claim successfully!");
                        })
                        .catch((err) => {
                          snackbarUtils.error("The transaction is declined!");
                        })
                        .finally(() => {
                          setDisabled(false);
                        });
                    }}
                  />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OpacityBoxGroupWrapper>
  );
};

export default OpacityBoxGroup;
