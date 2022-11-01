import { CorrectLine, WrongLine } from "@assets/animation";
import {
  ClockIcon,
  DepositIcon,
  Eye,
  HeartBrightIcon,
  HomeDataHUb,
  IviCurrency,
  RedHeart,
  WalletIcon,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import ModalNotification from "@components/ModalBaseNotifi";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import BreadCrumMapping from "@constants/breadcrumb";
import { DatahubAssetConst } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import keywordProvider from "@data-access/keyword-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import useQuerySearchParams from "@hook/useQuerySearchParams";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { IconData } from "@pages/trade/components/constants";
import { getLengthAddress } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Button } from "antd";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ModalWaitingConfirm from "../components/ModalComponent/ModalConfirm";
import ModalConfirmRequest from "../components/ModalConfirmRequest";
import { ButtonSwapToken, tokens } from "../deposit";
import ModalSwap from "../deposit/components/ModalSwap";
import ListingModal from "./ListingModal";
import ModalReport from "./ModalReport";
import RecordDetail from "./RecordDetail";
import RecordDetailNoitru from "./RecordDetailNoitru";
import RelateAsset from "./RelateAsset";
import { CircleBackground, CustomBreadCrumb } from "./StaticComponents";
import { AssetDetailWrapper } from "./styled";

const AssetDetailPage = (props) => {
  //hooks
  const { id } = useParams();
  const { location } = useHistory();
  const { requestId, role } = useQuerySearchParams();

  const { scrWidth } = useSelector((state) => state.global);
  const { owner, buyer, buyerWithDrawable } = useSelector(
    (state) => state.datasharing
  );
  const myAddress = useSelector((state) => state?.contracts?.address);
  const CollectedAfterSignDetailData = useSelector(
    (state) => state?.datasharing[`${role}CollectedAfterSignDetailData`]
  );

  const { cid, owner: dataOwner } = location.state;
  const { navigatePageFlag, buyerListSentRequests, refreshDatahubFlag } =
    useSelector((state) => state.datasharing);
  const {
    buyerAccuseResponse,
    ownerDecryptDataFromOwnedMetadataCid,
    buyerDecryptDataFromOwnedMetadataCid,
    buyerRequestData,
    buyerDeposit,
    buyerWithdrawable,
    updateData: updateDataSharing,
    buyerGetListSentRequests,
  } = useDispatch()?.datasharing;
  const setAmountDeposit = useDispatch()?.datahub?.setAmountDeposit;

  const listingRef = useRef();
  const amountDeposit = useSelector((state) => state?.datahub?.amountDeposit);
  const breadCrumbPrev = useSelector((state) => state?.global?.breadcrumb);
  const [state, _setState] = useState({
    data: {},
    isVisibleReportModal: false,
    isShowModalSucess: false,
    isShowModalError: false,
    isVisibleListingModal: false,
    publicDetailData: null,
    dataOther: [],
    isShowModalConfirm: false,
    isRequested: false,
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const { data, isVisibleReportModal } = state;
  const [keywordsConst, setKeywordsConst] = useState({});

  const GetButtonFromState = ({ page }) => {
    switch (page) {
      case 1:
        return <></>;
      case 2:
        return (
          <TradeButton
            content="List"
            type="gradient"
            className="w-full"
            onClick={() => {
              listingRef?.current?.show();
            }}
          />
        );
      case 3:
        return (
          // <TradeButton
          //   content="Report"
          //   type="gradient"
          //   className="w-full"
          //   onClick={handleOpenReportModal}
          // />
          <></>
        );
      case 4:
        return <></>;
      default:
        return myAddress === location.state.owner ? (
          <></>
        ) : (
          <TradeButton
            disabled={state?.isRequested}
            content={state?.isRequested ? "Requested" : "Request access"}
            type="gradient"
            className="w-full text-center"
            style={{ height: "50px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleShowModalConfirm();
            }}
          />
        );
    }
  };
  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
    });
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
    setState({
      amount: 0,
    });
  };
  const handleSubmit = () => {
    if (Number(amountDeposit) !== 0) {
      handleOpenModalWaiting();
      buyerDeposit({ amount: amountDeposit })
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
            "Try again"
          );
        });
    } else {
      snackbarUtils.error(`Please fill in amount to deposit!`);
    }
  };
  const buyerRequestAsset = (e) => {
    handleOpenModalWaiting();

    buyerRequestData({ cid: id, amount: state?.publicDetailData?.price })
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
  //map data
  const { address } = props;

  const dataResult = CollectedAfterSignDetailData?.result
    ? JSON.parse(CollectedAfterSignDetailData?.result)
    : "";
  // const dataResult = jsTest
  const dataDetail = CollectedAfterSignDetailData?.resultDetail
    ? JSON.parse(CollectedAfterSignDetailData?.resultDetail)
    : "";
  /*

        Function  

   */

  const handleOpenReportModal = () => {
    setState({
      isVisibleReportModal: true,
    });
  };
  const handleCloseModalReport = () => {
    setState({
      isVisibleReportModal: false,
    });
  };
  const handleCloseModalSucess = () => {
    setState({
      isShowModalSucess: false,
    });
  };
  const handleCloseModalError = () => {
    setState({
      isShowModalError: false,
    });
  };
  const handleOpenModalListing = () => {
    setState({
      isVisibleListingModal: true,
    });
  };
  const handleCloseModalListing = () => {
    // if (!isSaveDraft) {
    //   resetModalState();
    // }
    setState({
      isVisibleListingModal: false,
    });
  };

  const getDetailData = async () => {
    let params = {
      id,
      userAddress: address,
    };
    await DatahubAssetProvider.search(params)
      .then((res) => {
        if (res && res?.data?.code === 200) {
          setState({
            publicDetailData: (res?.data?.data || [])[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLiked = () => {
    AssetLikedProvider.changeLiked({ cid, address })
      .then((res) => {
        if (res?.data?.code === 200) {
          getDetailData();
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (!CollectedAfterSignDetailData) {
      if (role == "owner" && owner && id) {
        ownerDecryptDataFromOwnedMetadataCid({ cid: id });
      } else if (role == "buyer" && buyer && requestId) {
        buyerDecryptDataFromOwnedMetadataCid({ cid: requestId });
      }
    }
  }, [buyer, owner]);

  useEffect(() => {
    if (buyer) {
      buyerWithdrawable();
    }
  }, [buyer]);

  useEffect(() => {
    if (id && address) {
      getDetailData();
    }
  }, [id, address]);

  useEffect(() => {
    keywordProvider
      .search({ page: 0, size: 999 })
      .then((res) => {
        if (res?.data?.code === 200) {
          let keywordsMapConst = res?.data?.data?.reduce((obj, item) => {
            obj[item?.uId] = item?.label;
            return obj;
          }, {});
          setKeywordsConst(keywordsMapConst);
        }
        if (res?.data?.code === 400) {
          throw new Error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("Fetch keyword fail!", err);
      });
  }, []);
  const handleCloseModalConfirm = (e) => {
    e?.stopPropagation();

    setState({
      isShowModalConfirm: false,
    });
  };

  // check requested effect
  useEffect(() => {
    buyerGetListSentRequests();
  }, [buyer, refreshDatahubFlag, navigatePageFlag]);

  useEffect(() => {
    let listCidRequested = buyerListSentRequests
      ?.filter((item) => item?.status === 0)
      ?.map((item) => item?.dataCid);
    setState({
      isRequested: listCidRequested?.includes(id),
    });
  }, [buyer, buyerListSentRequests, refreshDatahubFlag, navigatePageFlag]);

  /* Data log để anh Hiếu test, không xóa !*/
  /*----------------------------------------*/
  console.group("Deleting on production");
  console.log("/*----------------------------------------*/");
  let background = "background: red; color: yellow; font-size: 40px";
  console.log("%cData lớn", background);
  console.log(CollectedAfterSignDetailData);
  console.log("%cData Result", background);
  console.log(dataResult);
  console.log("%cdata Detail", background);
  console.log(dataDetail);
  console.log("/*----------------------------------------*/");
  console.groupEnd("End data console part!");
  /*----------------------------------------*/
  return (
    <AssetDetailWrapper>
      <div className="detail-page__head d-flex">
        <div style={{ marginBottom: 30 }}>
          {scrWidth < 768 && (
            <CustomBreadCrumb
              arrayRouteFromParent={[
                {
                  text: BreadCrumMapping(breadCrumbPrev),
                  link: breadCrumbPrev || "/data-hub",
                },
                {
                  text: `${location.state?.cid?.slice(0, 8)}`,
                  // link: `/data-hub/asset-detail/${location.state.cid}`,
                },
              ]}
            />
          )}
        </div>
        <div className="head-left d-flex align-items-center justify-content-center">
          <img
            className="asset-image"
            src={require("@images/trade/datahub/item-example-image.png")}
            alt=""
          />
          <CircleBackground />
        </div>
        <div className="head-right">
          {scrWidth > 768 && (
            <CustomBreadCrumb
              arrayRouteFromParent={[
                {
                  text: BreadCrumMapping(breadCrumbPrev),
                  link: breadCrumbPrev || "/data-hub",
                },
                {
                  text: `${location.state?.cid?.slice(
                    0,
                    5
                  )}...${location.state?.cid?.slice(
                    location.state?.cid.length - 5
                  )}`,
                  // link: `/data-hub/asset-detail/${location.state.cid}`,
                },
              ]}
            />
          )}
          <div className="asset-code-and-like d-flex justify-content-space-between">
            <span className="code">
              <AddressTooltip
                address={location.state?.cid || ""}
                getLengthAddress={getLengthAddress(
                  location.state?.cid,
                  window.innerWidth
                )}
              />
            </span>
            <Button
              className={`favorite-btn ${
                state?.publicDetailData?.isLikedByCurrentUser && "is-liked"
              }`}
              onClick={handleLiked}
            >
              <HeartBrightIcon />
            </Button>
          </div>
          <div className="small-asset-detail d-flex">
            <div className="date d-flex align-items-center small-asset-detail__item">
              <ClockIcon />
              <span>
                {state?.publicDetailData?.create_at
                  ? moment(state?.publicDetailData?.create_at)?.format(
                      "DD/MM/YYYY"
                    )
                  : ""}
              </span>
            </div>
            <div className="view d-flex align-items-center small-asset-detail__item">
              <Eye />
              <span>{state?.publicDetailData?.viewsCount}</span>
            </div>
            <div className="liked d-flex align-items-center small-asset-detail__item">
              <RedHeart />
              <span>{state?.publicDetailData?.numLikes}</span>
            </div>
          </div>
          {/* <div className="tags-list d-flex align-items-center">
            <span>Tags:</span>
            <span>{data?.tags?.join("; ")}</span>
          </div> */}
          <div className="current-bid-info">
            <div className="creator d-flex justify-content-space-between">
              <div className="info-name">
                <div>Owner</div>
                <img
                  src={require("@images/trade/datahub/item-example-avatar.png")}
                  alt=""
                  className="info-name-img"
                />
                <div className="info-name-address">
                  <AddressTooltip
                    address={
                      dataOwner ||
                      (location?.state?.page === 2 && myAddress) ||
                      ""
                    }
                    getLengthAddress={getLengthAddress(
                      dataOwner || myAddress,
                      window.innerWidth
                    )}
                  />
                </div>
              </div>
              <div className="info-money">
                <div className="mb-3">Price</div>

                <div className="d-flex align-item-center">
                  <IviCurrency className="mr-2" />
                  <div className="info-money-price">
                    {state?.publicDetailData?.status === 0
                      ? state?.publicDetailData?.price?.formatCurrency()
                      : ""}{" "}
                    IVI
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="mt-3 mb-3">
              <GetButtonFromState page={location.state.page} />
            </div>
            <div>
              <span className="d-flex align-items-center mt-7">
                <span className="mr-4">Share:</span>
                <span className="icon-medicDetail">
                  {Object.keys(IconData).map((key, index) => {
                    let Icon = IconData[key].icon;
                    return (
                      <a href={IconData[key].link} key={index} target="_blank">
                        <Icon />
                      </a>
                    );
                  })}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="requester-and-creator d-flex ">
          {/* <div className="requester d-flex">
              <img
                src={require("@images/trade/datahub/item-example-avatar.png")}
                alt=""
              />
              <div>
                <p>Requester</p>
                <p>TenViMetamask</p>
              </div>
            </div> */}
          {/* <div className="creator d-flex">
              <img
                src={require("@images/trade/datahub/item-example-avatar.png")}
                alt=""
              />
              <div>
                <p>Owner</p>
                <p>{location?.state?.owner}</p>
              </div>
            </div> */}
        </div>
      </div>
      {state?.publicDetailData && state?.publicDetailData?.status === 0 && (
        <div className="detail-page__body-wrapper d-flex">
          <div className="left-content">
            <div className="detail-body__keyword">
              <h1 className="detail-body__title">keyword</h1>
              <div className="detail-body__content">
                {state?.publicDetailData?.keywords?.map((item, index) => {
                  return (
                    <span
                      key={index}
                      className="keyword-item"
                    >{`<${keywordsConst[item]}>`}</span>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="detail-body__type">
              <h1 className="detail-body__title">type</h1>
              <div className="detail-body__content">
                <div className="content-left">
                  <p className="content-line">
                    <span className="type-prop">Medical unit:</span>
                    <span className="type-value font-bold">
                      {
                        DatahubAssetConst.MEDICAL_UNIT.mapping[
                          state?.publicDetailData?.medicalUnit
                        ]
                      }
                    </span>
                  </p>
                  {/* <p className="content-line">
                    <span className="type-prop">Reason:</span>
                    <span className="type-value">
                      {state?.publicDetailData?.reason || ""}
                    </span>
                  </p> */}
                </div>
                {/* <div className="content-right">
                <p className="content-line type-value">Stomach examination</p>
                <p className="content-line type-value">Esophageal colitis</p>
                <p className="content-line type-value">Gastrocopy</p>
                <p className="content-line type-value">----</p>
                <p className="content-line type-value">Prescription - Dr.A</p>
              </div> */}
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="detail-body__description">
              <h1 className="detail-body__title">description</h1>
              <div className="detail-body__content">
                {/* style={{ whitespace: "pre-line" }} */}
                <p>{state?.publicDetailData?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {data?.buyer === address && <></>} */}
      {dataResult?.noiTru === false && (
        <RecordDetail
          data={CollectedAfterSignDetailData}
          dataResult={dataResult}
          dataDetail={dataDetail}
        />
      )}
      {dataResult?.noiTru === true && (
        <RecordDetailNoitru
          data={CollectedAfterSignDetailData}
          dataResult={dataResult}
          dataDetail={dataDetail}
        />
      )}

      {!data?.buyer && (
        <div className="detail-page__relate">
          <h1>Others</h1>
          <RelateAsset
            category={state?.publicDetailData?.keywords}
            userAddress={myAddress}
          />
        </div>
      )}
      <ModalReport
        visible={isVisibleReportModal}
        onOk={() => {
          buyerAccuseResponse({ requestId: location?.state?.accusseCid })
            .then((res) => {
              snackbarUtils.success(
                "Your report has been submited and will be processed in 24h!"
              );
            })
            .catch((err) => {
              console.log(err);
              snackbarUtils.error(
                "Accuse fail!",
                <div>
                  <WrongLine />
                  <div className="text-center">
                    Hash-key provided by the owner is correct; thus, your report
                    is rejected
                  </div>
                </div>
              );
              // setState({
              //   isShowModalError: true,
              // });
            });
        }}
        onCancel={handleCloseModalReport}
      />
      <ModalNotification
        visible={state.isShowModalSucess}
        type={"success"}
        onCancel={handleCloseModalSucess}
        closeContent={"OK"}
        title="Report successfully"
        content="Success and wait for system response"
      />
      <ModalNotification
        visible={state.isShowModalError}
        type={"error"}
        onCancel={handleCloseModalError}
        onOk={() => {
          setState({
            isShowModalSucess: true,
          });
        }}
        content="Reason fail and retry report"
        title="Report failed"
        closeContent={"Cancel"}
        actionContent={"Retry"}
      />
      <ListingModal
        ref={listingRef}
        cid={id}
        data={state?.publicDetailData}
        getDetailData={getDetailData}
        dataDraft={""}
      />
      <ModalWaitingConfirm visible={false} />
      <ModalConfirmRequest
        dataCid={id}
        tokenAmount={state?.publicDetailData?.price}
        dataOwner={dataOwner}
        visible={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={(e) => {
          e.stopPropagation();
          handleCloseModalConfirm(e);

          if (buyerWithDrawable >= state?.publicDetailData?.price) {
            buyerRequestAsset();
          } else {
            setAmountDeposit({
              amount: state?.publicDetailData?.price - buyerWithDrawable,
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

        title={"Waiting for processing transaction"}
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
                  {state?.publicDetailData?.price - buyerWithDrawable}
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
                <strong style={{ wordBreak: "break-word" }}>{cid}</strong>{" "}
                successfully.
              </p>

              <p>
                If there is no claim from the data recipient within 24 hours,
                you are eligible to withdraw your token.
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
                          address={cid}
                          getLengthAddress={getLengthAddress(
                            cid,
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
                      <strong>
                        {" "}
                        {`${state?.publicDetailData?.price} IVI`}
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
                    <span>Owner</span>
                    <span>
                      {" "}
                      <AddressTooltip
                        address={dataOwner}
                        getLengthAddress={getLengthAddress(
                          dataOwner,
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
    </AssetDetailWrapper>
  );
};

export default AssetDetailPage;
