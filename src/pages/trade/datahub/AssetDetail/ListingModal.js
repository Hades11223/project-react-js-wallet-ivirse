import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ModalNotification from "@components/ModalBaseNotifi";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import useCustomState from "@hook/useCustomState";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Steps } from "antd";
import moment from "moment";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import DataInfoStep from "./components/ListingModal/DataInfoStep";
import SaleInfoStep from "./components/ListingModal/SaleInfoStep";
import { ModalListingWrapper } from "./styled";

const { Step } = Steps;

const ListingModal = (
  {
    visible,
    onOk,
    onCancel,
    cid,
    data,
    getDetailData = () => {},
    dataDraft,
    ...props
  },
  ref
) => {
  // console.log(getDetailData);
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ parentModalVisible: true });
    },
  }));
  const [state, setState] = useCustomState({
    currentStep: 0,
    isVisibleSuccess: false,
    isVisibleError: false,
    medicalUnit: data?.medicalUnit,
    categoryList: data?.category,
    keywordsList: data?.keywords,
    description: data?.description,
    reason: data?.reason,
    isSaveDraft: false,
    expiredDate: moment(data?.expiredTime)?.format("YYYY/MM/DD"),
    expiredTime: moment(data?.expiredTime)?.format("hh:mm"),
    // hashtag: data?.hashtag,
    isCheckout: false,
    parentModalVisible: false,
    isVisibleModalWaiting: false,

    //

    // categoryList: null,
    // keywordsList: null,
    // description: null,
    // toValue: null,
    // reason: null,
    // medicalUnit: null,
  });
  const listStep = [
    {
      title: "Data information",
      component: (
        <DataInfoStep assetCId={cid} setState={setState} state={state} />
      ),
    },
    {
      title: "Sales information",
      component: (
        <SaleInfoStep assetCId={cid} setState={setState} state={state} />
      ),
    },
  ];

  const handleProgressStep = (type) => {
    var currentStep = state.currentStep;
    if (type === "next") {
      currentStep += 1;
    }
    if (type === "previous") {
      currentStep -= 1;
    }
    setState({
      currentStep,
    });
  };
  const handleSaveDraft = async () => {
    let {
      categoryList,
      keywordsList,
      description,
      toValue,
      // expiredDate,
      // expiredTime,
      reason,
      medicalUnit,
      // hashtag,
    } = state;
    let body = {
      status: 1,
      assetCId: cid,
      category: categoryList,
      keywords: keywordsList,
      price: Number(toValue),
      // hashtag: hashtag,
      reason,
      medicalUnit,
      // expiredTime: `${expiredDate} ${expiredTime}`,
      description: description,
    };
    // DatahubAssetProvider.save(body)
    //   .then((res) => {
    //     if (res?.data?.code === 200 || res?.data?.code === 201) {
    //       let likedBody = {
    //         assetCId: cid,
    //         listLiker: [],
    //       };
    //       AssetLikedProvider.create(likedBody);
    //       snackbarUtils.success("Successfully save draft!");
    //       handleCloseModal();
    //     }
    //     if (res?.data?.code === 400) {
    //       snackbarUtils.error(res?.data?.message);
    //     }
    //   })
    //   .catch((err) => {
    //     snackbarUtils.error(err?.message);
    //   });

    // Lưu vào local
    const localTest = localStorage.getObj("test");
    console.log(localTest, "localTest");
    const vitri = localTest?.findIndex((val) => val.assetCId === body.assetCId);

    console.log(vitri, "vitru");
    if (vitri >= 0) {
      localTest.splice(vitri, 1);
    }

    if (localTest) await localStorage.setObj("test", [...localTest, body]);
    else await localStorage.setObj("test", [body]);
    snackbarUtils.success(
      "Save draft success !"
    );
    // setState({
    //   isSaveDraft: true,
    // });
  };

  // get data local
  const handleGetLocalData = (arr, cid) => {
    console.log(arr, "arrrr");
    if (arr) {
      const vitri = arr?.findIndex((item) => item.assetCId === cid);
      console.log(arr[vitri], "return arr[vitri]");
      return arr[vitri];
    }
  };

  const handleDeleteLocal = () => {
    const localTest = localStorage.getObj("test");
    console.log(localTest, "localTest");
    const vitri = localTest?.findIndex((val) => val.assetCId === cid);

    console.log(vitri, "vitru");
    if (vitri >= 0) {
      localTest.splice(vitri, 1);
      localStorage.setObj("test", [...localTest]);
    }
  };

  const handleResetState = () => {
    setState({
      currentStep: 0,
      isVisibleSuccess: false,
      isVisibleError: false,
      categoryList: [],
      keywordsList: [],
      description: null,
      isSaveDraft: false,
      toValue: null,
      expiredDate: null,
      expiredTime: null,
      reason: null,
      medicalUnit: null,
      // hashtag: [],
    });
  };
  const handleCreateBeData = async () => {
    let {
      categoryList,
      keywordsList,
      description,
      toValue,
      // expiredDate,
      // expiredTime,
      reason,
      medicalUnit,
      // hashtag,
    } = state;
    let body = {
      status: 0,
      assetCId: cid,
      category: categoryList,
      keywords: keywordsList,
      price: Number(toValue),
      reason: reason,
      medicalUnit: medicalUnit,
      // hashtag: hashtag,
      // expiredTime: `${expiredDate} ${expiredTime}`,
      description: description,
    };
    return await DatahubAssetProvider.save(body);
    // .then(async (res) => {
    //   if (res?.data?.code === 400) {
    //     throw new Error(res?.data?.message);
    //   } else {
    //     let likedBody = {
    //       assetCId: cid,
    //       listLiker: [],
    //     };
    //     AssetLikedProvider.create(likedBody);
    //   }
    // })
    // .catch((error) => {
    //   snackbarUtils.error(error?.message);
    // });
  };
  const handleCloseModal = () => {
    new Promise((resolve, reject) => {
      resolve(true);
    })
      .then(() => {
        setState({
          isVisibleModalWaiting: false,
          currentStep: 0,
          isCheckout: false,
        });
        return true;
      })
      .then((res) => {
        setTimeout(() => {
          setState({
            parentModalVisible: false,
          });
        }, 100);
      });
  };

  const ownerPostDataToMarketplace =
    useDispatch()?.datasharing?.ownerPostDataToMarketplace;
  const ownerGetPostDataToMarketplace =
    useDispatch()?.datasharing?.ownerGetPostDataToMarketplace;
  // useEffect(() => {
  //   setState({
  //     categoryList: dataDraft?.category,
  //     keywordsList: dataDraft?.keywords,
  //     description: dataDraft?.description,
  //     expiredDate: moment(data?.expiredTime)?.format("YYYY/MM/DD"),
  //     expiredTime: moment(data?.expiredTime)?.format("hh:mm"),
  //     // hashtag: data?.hashtag,
  //     toValue: dataDraft?.price,
  //     reason: data?.reason,
  //     medicalUnit: dataDraft?.medicalUnit,
  //   });
  // }, [dataDraft]);
  useEffect(() => {
    // const dataLocal = handleGetLocalData(localStorage.getObj("test"), cid);

    const dataLocal = JSON.parse(localStorage.getItem("test"))?.find(
      (item) => item.assetCId === cid
    );
    console.log(dataLocal, cid, "tuandq");
    setState({
      categoryList: dataLocal?.category,
      keywordsList: dataLocal?.keywords,
      description: dataLocal?.description,
      expiredDate: moment(data?.expiredTime)?.format("YYYY/MM/DD"),
      expiredTime: moment(data?.expiredTime)?.format("hh:mm"),
      // hashtag: data?.hashtag,
      toValue: dataLocal?.price,
      reason: data?.reason,
      medicalUnit: dataLocal?.medicalUnit,
    });
  }, [cid]);
  return (
    <ModalListingWrapper
      visible={state.parentModalVisible}
      onOk={onOk}
      onCancel={() => {
        setState({
          parentModalVisible: false,
          currentStep: 0,
          isCheckout: false,
          // categoryList: [],
          // keywordsList: [],
          // description: null,
          // toValue: null,
          // reason: null,
          // medicalUnit: null,
        });
      }}
      title={"List data"}
      closeIcon={<CloseOutlined />}
      footer={
        <div className="modal-listing__footer d-flex justify-content-space-between">
          <div className="progress-btn d-flex">
            {state.currentStep > 0 && (
              <Button
                onClick={() => {
                  handleProgressStep("previous");
                }}
              >
                <ArrowLeftOutlined />
                <span>Previous</span>
              </Button>
            )}
            {state.currentStep < listStep.length - 1 && (
              <Button
                onClick={() => {
                  handleProgressStep("next");
                }}
              >
                <span>Next</span>
                <ArrowRightOutlined />
              </Button>
            )}
          </div>
          <div className="save-draft-and-cancel-btn-group d-flex">
            <TradeButton
              content="Save draft"
              type="transparent_violet_custom"
              onClick={handleSaveDraft}
            />
            <TradeButton
              content="List"
              type="gradient"
              disabled={state?.currentStep === 0 || !state?.isCheckout}
              onClick={() => {
                // handleDeleteLocal()
                handleCreateBeData()
                  .then(async (res) => {
                    console.log(res);
                    if (res?.data?.code === 201 || res?.data?.code === 200) {
                      let likedBody = {
                        assetCId: cid,
                        listLiker: [],
                      };
                      await AssetLikedProvider.create(likedBody);
                      setState({ isVisibleModalWaiting: true });
                      ownerPostDataToMarketplace({
                        cid,
                        amount: state.toValue,
                      })
                        .then((res) => {
                          getDetailData();
                          ownerGetPostDataToMarketplace();
                          snackbarUtils.success("Listing success!");
                          handleDeleteLocal(); // xóa data ở local khi listing thành công
                          handleCloseModal();
                        })
                        .catch((err) => {
                          console.log(err, "adad");
                          // Delete prev create info in NODE BE if blockchain fail
                          let params = {
                            id: cid,
                          };
                          DatahubAssetProvider.delete(params);
                          AssetLikedProvider.delete(params);
                          setState({ isVisibleModalWaiting: false });
                          snackbarUtils.error("Listing fail!");
                        });
                    }
                    if (res?.data?.code === 400) {
                      console.log("loi r");
                      snackbarUtils.error(
                        "Listing fails, please fill in your missing information",
                        <>
                          <div>{res?.data?.message?.slice(0, 24)}</div>
                          <div>
                            {res?.data?.message
                              ?.slice(24)
                              ?.split(",")
                              ?.map((item) => (
                                <div> - {item}</div>
                              ))}
                          </div>
                        </>
                      );
                    }
                  })
                  .catch((err) => {
                    snackbarUtils.error(err?.message);
                  });
              }}
            />
          </div>
        </div>
      }
      {...props}
    >
      <Steps
        className="step-listing__container"
        progressDot
        current={state.currentStep}
      >
        {listStep?.map((item) => (
          <Step key={item?.title} title={item?.title} />
        ))}
      </Steps>
      <div className="step-content__wrapper">
        {listStep[state.currentStep].component}
      </div>
      {/* Success listing */}
      <ModalNotification
        visible={state.isShowModalSucess}
        type={"success"}
        onCancel={() => setState({ isShowModalSucess: false })}
        closeContent={"OK"}
        title="Report successfully"
        content="Success and wait for system response"
      />
      {/* Error listing */}
      <ModalNotification
        visible={state.isVisibleError}
        type={"error"}
        onCancel={() => setState({ isVisibleError: false })}
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
      <RandomWaitingModal
        visible={state.isVisibleModalWaiting}
        title={"Waiting for blockchain processing"}
        // onCancel={() => {
        //   setState({ isVisibleModalWaiting: false });
        // }}
      />
    </ModalListingWrapper>
  );
};

export default forwardRef(ListingModal);
