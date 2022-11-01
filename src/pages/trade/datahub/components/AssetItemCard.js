import { CorrectLine, WrongLine } from "@assets/animation";
import {
  DepositIcon,
  HeartBrightIcon,
  HomeDataHUb,
  IviCurrency,
  WalletIcon,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import { getStatusByCode } from "@constants";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Col } from "antd";
import React, { useEffect, useRef } from "react";
import CurrencyInput from "react-currency-input-field";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ListingModal from "../AssetDetail/ListingModal";
import ModalConfirmRequest from "../components/ModalConfirmRequest";
import { ButtonSwapToken, tokens } from "../deposit";
import ModalSwap from "../deposit/components/ModalSwap";
import "./cloneScss.scss";
import ModalWaitingConfirm from "./ModalComponent/ModalConfirm";
import { AssetItemWrapper } from "./styled";
const CustomBadge = ({ bgColor, text, textColor }) => {
  return (
    <span
      className="custom-badge"
      style={{
        display: "inline-block",
        backgroundColor: bgColor,
        border: "none",
        borderRadius: "10px",
        color: textColor,
        fontWeight: 400,
        fontSize: "11px",
        lineHeight: "14px",
        padding: "4px",
        height: "fit-content",
        // maxHeight: "32px",
      }}
    >
      {text}
    </span>
  );
};

const GrantedOverLay = () => {
  return (
    <div className="granted-overlay">
      <div className="granted d-flex align-items-center justify-content-center">
        <div>
          <p>granted</p>
          <p>we 're sorry</p>
        </div>
      </div>
    </div>
  );
};

const AssetItem = ({
  buyer,
  data,
  ownerDecryptDataFromOwnedMetadataCid,
  buyerDecryptDataFromOwnedMetadataCid,
  colResponsiveProps,
  type,
  statusItem,
  updateDataSharing,
  changeLike,
  handleLiked = () => {},
  buyerWithDrawable,
  buyerWithdrawable,
  buyerDeposit,
  buyerListSentRequests,
  buyerGetListSentRequests,
  refreshDatahubFlag,
  navigatePageFlag,
}) => {
  let {
    code,
    status,
    metadataCid,
    dataCid,
    tokenAmount,
    requestId,
    owner,
    dataOwner,
    assetCId,
    price,
  } = data || {};
  const buyerAccuseResponse = useDispatch()?.datasharing?.buyerAccuseResponse;
  const history = useHistory();
  const { address } = useSelector((state) => state.contracts);
  const listingRef = useRef();
  const buyerRequestData = useDispatch()?.datasharing?.buyerRequestData;
  const setAmountDeposit = useDispatch()?.datahub?.setAmountDeposit;
  const amountDeposit = useSelector((state) => state?.datahub?.amountDeposit);
  const nameId = type ? dataCid : metadataCid || dataCid || assetCId;
  const {scrWidth} = useSelector(state=>state?.global)
  const [state, setState] = useCustomState({
    isShowModalConfirm: false,
    methodToken: 1,
    currentToken: tokens[0],
    currentTokenIndex: 0,
    // modal swap
    isOpenModalSwap: false,
    // amount:input
    amount: 0,
    // modal waiting
    isOpenModalWaiting: false,
    isShowIcon: false,

    // check user requested
    isRequested: false,
  });
  let { isRequested } = state;
  const functionConfirm = () => {
    buyerAccuseResponse({ requestId: requestId })
      .then((res) => {
        snackbarUtils.success(
          "Your report has been submited and will be processed in 24h.",
          <div>
            <CorrectLine />
          </div>
        );
      })
      .catch((err) => {
        console.log("Err acuse", err);
        snackbarUtils.error(
          "Accuse fail!",
          <div>
            <WrongLine />
            <div className="text-center">
              Hash-key provided by the owner is correct; thus, your report is
              rejected
            </div>
          </div>
        );
      });
  };
  const handleUpdateViews = (assetCId) => {
    let body = { assetCId };
    DatahubAssetProvider.updateViews(body)
      .then((res) => {
        // if (res && res?.data?.code === 200) {
        // }
        if (res && res?.data?.code === 400) {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("error update views", err);
      });
  };

  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
    });
  };
  const handleCloseModalConfirm = (e) => {
    e.stopPropagation();

    setState({
      isShowModalConfirm: false,
    });
  };
  let cid = type ? requestId : metadataCid || dataCid;
  const getButtonFromStatus = (statusItem) => {
    switch (statusItem) {
      case 1:
        return <></>;
      case 2:
        return (
          <TradeButton
            content={"List"}
            type="gradient"
            className={"w-full text-center"}
            onClick={(e) => {
              e.stopPropagation();

              listingRef?.current?.show();
              let action = type
                ? buyerDecryptDataFromOwnedMetadataCid
                : ownerDecryptDataFromOwnedMetadataCid;

              // action({
              //   cid,
              // }).then((res) => {
              //   history.push({
              //     pathname: `/data-hub/asset-detail/${cid}`,
              //     search: `role=${type ? "buyer" : "owner"}`,
              //     state: {
              //       page: statusItem,
              //       cid,
              //     },
              //   });
              // });
            }}
          />
        );
      case 3:
        return (
          <TradeButton
            content={"Report"}
            type="gradient"
            className={"w-full text-center"}
            style={{ border: "1px solid #FFFFFF", background: "transparent" }}
            onClick={(e) => {
              e.stopPropagation();

              snackbarUtils.confirm({
                title: "Confirm Report",
                content: "Are you sure you want to report this asset's issues?",
                onOk: () => {
                  functionConfirm();
                },
              });
            }}
          />
        );
      case 4:
        return <></>;
      default:
        return data?.owner === address || status === "GRANT" ? (
          <></>
        ) : (
          <TradeButton
            disabled={state?.isRequested}
            content={state?.isRequested ? "Requested" : `Request access`}
            type="gradient"
            className={"w-full text-center hover-123"}
            onClick={(e) => {
              e.stopPropagation();
              handleShowModalConfirm();
            }}
          />
        );
    }
  };
  const handleCloseModalWaiting = () => {
    setState({
      isOpenModalWaiting: false,
    });
  };
  const handleOpenModalWaiting = () => {
    setState({
      isOpenModalWaiting: true,
    });
  };
  const onSuccessProc = () => {
    setAmountDeposit({
      amount: 0,
    });
  };
  const handleSubmit = async () => {
    if (Number(amountDeposit) !== 0) {
      handleOpenModalWaiting();
      buyerDeposit()
        .then(() => {
          buyerWithdrawable();
          onSuccessProc();
          handleCloseModalWaiting();
          snackbarUtils.success(
            "Deposit success!",
            <div>
              <CorrectLine />
            </div>,
            () => {
              buyerRequestAsset();
            },
            "Continue request"
          );
        })
        .catch((err) => {
          console.log(err);
          handleCloseModalWaiting();
          snackbarUtils.error(
            "Deposit fail!",
            <div>
              <WrongLine />
            </div>,
            () => {
              handleSubmit();
            },
            "Try again",
            true
          );
        });
    } else {
      snackbarUtils.error(`Please fill in amount to deposit!`);
    }
  };

  const depositRef = useRef();
  const successRef = useRef();

  const handleOpenModalSwap = () => {
    setState({
      isOpenModalSwap: true,
    });
  };
  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx = tokenIdx === undefined ? state.currentTokenIndex : tokenIdx;
    setState({
      isOpenModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };
  useEffect(() => {
    buyerGetListSentRequests();
  }, [buyer, refreshDatahubFlag, navigatePageFlag]);

  useEffect(() => {
    let listCidRequested = buyerListSentRequests
      ?.filter((item) => item?.status === 0)
      ?.map((item) => item?.dataCid);
    setState({
      isRequested: listCidRequested?.includes(nameId),
    });
  }, [buyer, buyerListSentRequests, refreshDatahubFlag, navigatePageFlag]);
  const buyerRequestAsset = (e) => {
    handleOpenModalWaiting();

    buyerRequestData({ cid: dataCid, amount: tokenAmount })
      .then((res) => {
        setState({ hash: res.hash });
        successRef?.current?.show({
          callback: () => {
            setState({ isShowModalConfirm: false });
          },
        });
      })
      .catch((err) => {
        snackbarUtils.error(
          `Request fail! ${
            err?.reason || "Please check your network connection"
          }`
        );
      })
      .finally(() => {
        handleCloseModalWaiting();
        updateDataSharing({
          refreshDatahubFlag: refreshDatahubFlag + 1,
        });
      });
  };
  return (
    <Col {...colResponsiveProps}>
      <AssetItemWrapper
        className={`trade-item ${status === "DB03" ? "status-granted" : ""}`}
        onClick={(e) => {
          e.stopPropagation();

          let cid = type ? requestId : metadataCid || dataCid;
          if (statusItem) {
            let action = type
              ? buyerDecryptDataFromOwnedMetadataCid
              : ownerDecryptDataFromOwnedMetadataCid;
            action({
              cid,
            }).then((res) => {
              handleUpdateViews(nameId);
              history.push({
                pathname: `/data-hub/asset-detail/${nameId}`,
                search: `role=${type ? "buyer" : "owner"}${
                  requestId ? `&requestId=${requestId}` : ""
                }`,
                state: {
                  page: statusItem,
                  cid: nameId,
                  accusseCid: requestId,
                  owner: owner || dataOwner,
                  isRequested: isRequested,
                },
              });
            });
          } else {
            handleUpdateViews(nameId);
            history.push({
              pathname: `/data-hub/asset-detail/${nameId}`,
              // search: `role=${type ? "buyer" : "owner"}`,
              state: {
                page: statusItem,
                cid: nameId,
                amount: tokenAmount,
                owner: owner || dataOwner,
                isRequested: isRequested,
              },
            });
          }
        }}
      >
        <div
          className={`trade-item__image ${getStatusByCode(
            statusItem
          )?.toLowerCase()} d-flex align-items-center justify-content-center`}
        >
          <img
            className="trade-item__image-card"
            src={require("@images/trade/datahub/item-example-image.png")}
            alt=""
          />
          {status === "GRANT" && <GrantedOverLay />}

          <img
            className="avatar"
            src={require("@images/trade/datahub/item-example-avatar.png")}
            alt=""
          />
        </div>
        <div className="name-and-like-count d-flex align-items-center">
          <CustomBadge bgColor="#1B76FF" textColor={"white"} text="BSC" className={"name-and-like-count-badge"} />
          <div className="d-flex justify-content-space-between w-full ml-2 align-items-center">
            <span className="name ">
              <AddressTooltip
              className="AddressTooltip-card"
                address={nameId || ""}
                getLengthAddress={`${nameId?.substring(0, 2)} ... ${nameId?.substring(
                  nameId.length - 2,
                  nameId.length
                )} `}
              />
            </span>
            {statusItem !== 2 && (
              <div className="like-count d-flex align-items-center">
                <HeartBrightIcon
                  className={`${
                    data?.publicDetail?.isLikedByCurrentUser && "user-liked"
                  } like-icon `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLiked({
                      cid: data?.publicDetail?.assetCId || data?.assetCId,
                      address,
                    })
                      ?.then((res) => {
                        if (res?.data?.code === 200) {
                          updateDataSharing({
                            changeLike: !changeLike,
                          });
                          // debugger
                        }
                      })
                      .catch((err) => {
                        console.log("Liked action", err?.message);
                      });
                  }}
                />
                <span>{data?.publicDetail?.numLikes || ""}</span>
              </div>
            )}
          </div>
        </div>
        <div className="code d-flex">
          <span className="code-value">{code}</span>
        </div>
        <div className="current-bid d-flex justify-content-space-between">
          {scrWidth>576&&<span>Price</span>}
          <div className="current-bid__value d-flex align-items-center">
            <span className="currency-value d-flex align-items-center ">
              <IviCurrency className="ivi-currency mr-2" />
              {data?.tokenAmount?.hexToDecimal()?.notFloatingComma() ||
                data?.publicDetail?.price ||
                price}{" "}
              IVI
            </span>
          </div>
        </div>
        <div className="expired-in-and-request-accept ">
          {getButtonFromStatus(statusItem)}
        </div>
      </AssetItemWrapper>
      <ModalWaitingConfirm visible={false} />
      <ModalConfirmRequest
        dataCid={dataCid}
        tokenAmount={tokenAmount}
        dataOwner={owner}
        visible={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={(e) => {
          e.stopPropagation();
          handleCloseModalConfirm(e);
          if (buyerWithDrawable >= tokenAmount?.hexToDecimal()) {
            buyerRequestAsset();
          } else {
            setAmountDeposit({
              amount: tokenAmount?.hexToDecimal() - buyerWithDrawable,
            });

            depositRef?.current?.show({ submit: handleSubmit });
          }
        }}
      />
      <ModalSwap
        visible={state.isOpenModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[state.currentTokenIndex]}
      />
      <RandomWaitingModal
        visible={state.isOpenModalWaiting}
        // onOk={() => {}}
        // onCancel={handleCloseModalWaiting}
        title={"Waiting for blockchain processing"}
        // content={"Metamask is processing..."}
      />
      <BaseModal
        ref={depositRef}
        title="Make deposit"
        renderForm={() => {
          return (
            <>
              <p>Your balance is low!</p>
              <p>
                You need to deposit at least{" "}
                <strong>
                  {tokenAmount?.hexToDecimal() - buyerWithDrawable}
                </strong>{" "}
                IVI to complete your purchase
              </p>
              <div
                style={{
                  backgroundColor: "#ecf9f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div className="d-flex justify-content-center gap-10">
                  <WalletIcon className="fill-black" />
                  <strong>WALLET</strong>
                  <DepositIcon />
                  <HomeDataHUb className="fill-black" />
                  <strong>DATAHUB</strong>
                </div>
                <div className="d-flex justify-content-center gap-10">
                  <p>*** Make deposit into smartcontract</p>
                </div>
                <div>
                  <div className="d-flex justify-content-space-between mb-4">
                    <div>
                      <ButtonSwapToken
                        handleOpenModalSwap={handleOpenModalSwap}
                        state={state}
                      />
                      <div className="token-amount mt-2">
                        <CurrencyInput
                          className="currency-input"
                          placeholder="Enter amount"
                          style={{ width: "100%" }}
                          decimalSeparator={"."}
                          groupSeparator={","}
                          decimalsLimit={8}
                          onValueChange={(value) => {
                            setAmountDeposit({
                              amount: value,
                            });
                          }}
                          value={amountDeposit}
                        />
                      </div>
                    </div>
                    <p className="token-balance">
                      Balance: {buyerWithDrawable}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }}
        submitText={"Deposit"}
      />
      <ListingModal
        ref={listingRef}
        cid={cid}
        data={data?.publicDetailData}
        getDetailData={() => {}}
      />
      <BaseModal
        ignoreCancelButton={true}
        ref={successRef}
        title="Your purchase has processed"
        submitText="Return to Datahub"
        renderForm={() => {
          return (
            <>
              <p>
                You have just shared your{" "}
                <strong style={{ wordBreak: "break-word" }}>{dataCid}</strong>{" "}
                successfully.
              </p>

              <p>
                If there is no claim from the data recipient within 24 hours,
                you are eligible to withdraw your token
              </p>
              <div
                style={{
                  backgroundColor: "#ecf9f4",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                }}
              >
                <div
                  className="img-field"
                  style={{
                    backgroundColor: "#ecf9f4",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Data ID</span>
                    <span>
                      <strong>
                        {" "}
                        <AddressTooltip
                          address={dataCid}
                          getLengthAddress={getLengthAddress(
                            dataCid,
                            window.innerWidth
                          )}
                        />
                      </strong>
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>Price</span>
                    <span>
                      {" "}
                      <strong> {`${tokenAmount?.hexToDecimal()} IVI`}</strong>
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>Owner</span>
                    <span>
                      {" "}
                      <AddressTooltip
                        address={owner}
                        getLengthAddress={getLengthAddress(
                          owner,
                          window.innerWidth
                        )}
                      />
                    </span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>Status</span>
                    <span style={{ color: "#0A9921" }}>Complete</span>
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>Transation hash</span>
                    <span>
                      <AddressTooltip
                        address={state.hash}
                        getLengthAddress={getLengthAddress(
                          state.hash,
                          window.innerWidth
                        )}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </>
          );
        }}
      />
    </Col>
  );
};

const mapStateToProps = ({
  datasharing: {
    changeLike,
    buyerListSentRequests,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  },
}) => ({
  changeLike,
  buyerListSentRequests,
  buyer,
  refreshDatahubFlag,
  navigatePageFlag,
});
const mapDispatchToProps = ({
  datasharing: { updateData, buyerGetListSentRequests },
}) => ({
  updateDataSharing: updateData,
  buyerGetListSentRequests,
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetItem);
