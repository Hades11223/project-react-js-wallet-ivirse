import BaseResponsive from "@components/base/BaseResponsive";
import TradeButton from "@components/TradeButton";
import useCustomState from "@hook/useCustomState";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { CustomSearch } from "@pages/trade/components/styled";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { getLengthAddress, getLengthAddressByWindowScreen } from "@utils/";
import snackbarUtils from "@utils/snackbar-utils";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmRequest from "./components/ModalConfirmRequest";
import ModalSuccessNoti from "./components/ModalSuccessNoti";
import ModalWaitingConfirm from "./components/ModalWaitingConfirm";
import { RequestWrapper } from "./styled";

const rejectClassName = [
  "text__inline",
  "ant-btn ant-btn-default d-flex align-items-center ",
];
const Requests = () => {
  //hook
  const [state, setState] = useCustomState({
    // table page size
    page: 0,
    size: 10,
    // 0 for received, 1 for made
    tableType: 0,
    // Modal confirm
    isShowModalConfirm: false,
    isShowModalWaiting: false,
    isShowModalSuccessNoti: false,
  });

  const {scrWidth} = useSelector(state=>state?.global)

  const {
    ownerListReceivedRequests,
    buyerListSentRequests,
    responsePeriod,
    owner,
    buyer,
  } = useSelector((state) => state?.datasharing);

  const {
    ownerGetListReceivedRequests,
    ownerGetResponsePeriod,
    ownerAcceptRequest,
    ownerDeclineRequest,
    buyerGetListSentRequests,
  } = useDispatch()?.datasharing;
  //effect
  useEffect(() => {
    if (owner && buyer) {
      ownerGetListReceivedRequests();
      ownerGetResponsePeriod();
      buyerGetListSentRequests();
    }
  }, [owner, buyer]);
  const { width } = useDebounceWindowResize();
  //column
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return state.page * state.size + index + 1;
      },
      width: "5%",
    },
    {
      title: "Data ID",
      dataIndex: "dataCid",
      key: "dataCid",
      width: "20%",
      render: (dataCid) => (
        <AddressTooltip
          address={dataCid || ""}
          getLengthAddress={getLengthAddressByWindowScreen(dataCid, width)}
        />
      ),
      sm: 12,
      ignoreTitle: true,
      contentBold: true,
    },
    {
      title: "Price",
      dataIndex: "tokenAmount",
      key: "tokenAmount",
      width: "10%",
      render: (tokenAmount) => tokenAmount?.hexToDecimal(),
      sm: 24,
      contentBold: true,
      widthLeft: {
        ipad: 30,
      },
    },
    {
      title: state.tableType ? "Made to" : "From",
      dataIndex: "buyer",
      key: "buyer",
      width: "20%",
      render: (buyer, obj) => (
        <AddressTooltip
          address={(state.tableType ? obj.dataOwner : buyer) || ""}
          getLengthAddress={getLengthAddressByWindowScreen(
            state.tableType ? obj.dataOwner : buyer,
            width
          )}
        />
      ),
      sm: 24,
      contentBold: true,
      widthLeft: {
        ipad: 30,
      },
    },
    {
      title: "Expiration",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt) => {
        return moment
          .unix(createdAt?.hexToNumber() + responsePeriod)
          .format("DD-MM-YYYY HH:mm:ss");
      },
      sm: 24,
      contentBold: true,
      widthLeft: {
        ipad: 30,
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      sm: 24,
      contentBold: true,
      widthLeft: {
        ipad: 30,
      },
      render: (status, record) => {
        switch (status) {
          case 0:
            return state.tableType ? (
              <>Awaiting confirmation</>
            ) : (
              <TradeButton
                content={"Confirm"}
                type="gradient"
                onClick={() => {
                  handleShowModalConfirm(record);
                }}
              />
            );
          case 1:
            return <span style={{ color: "red" }}>Rejected</span>;
          case 2:
            return <span style={{ color: "#0A9921" }}>Accepted</span>;
          case 3:
            return <span style={{ color: "#C6C6C6" }}>Reported</span>;
          case 4:
            return <span style={{ color: "#C6C6C6" }}>Expired</span>;
          case 5:
            return <span style={{ color: "#C6C6C6" }}>Accused</span>;
          default:
            break;
        }
      },
    },
  ];
  //function
  const handleShowModalConfirm = (record) => {
    setState({
      isShowModalConfirm: true,
      currentTime: record?.createdAt?.hexToNumber(),
      currentRequestId: record.requestId,
      currentRequestData: record,
    });
  };

  const handleCloseModalConfirm = (event) => {
    if (rejectClassName.includes(event.target.className)) {
      setState({
        isShowModalWaiting: true,
        isShowModalConfirm: false,
      });
      ownerDeclineRequest({ requestId: state.currentRequestId })
        .then((res) => {
          setState({
            isShowModalSuccessNoti: true,
          });
        })
        .catch((err) => {
          console.log("err", err);

          snackbarUtils.error(
            `Reject fail! ${
              err?.reason || "Please check your network connection"
            }`
          );
        })
        .finally((err) => {
          ownerGetListReceivedRequests();
          setState({
            isShowModalWaiting: false,
            isShowModalConfirm: false,
          });
        });
    } else {
      setState({
        isShowModalConfirm: false,
      });
    }
  };
  const handleConfirm = (event) => {
    console.log(event.target);
    setState({
      isShowModalWaiting: true,
      isShowModalConfirm: false,
    });
    ownerAcceptRequest({ requestId: state.currentRequestId })
      .then((res) => {
        setState({
          isShowModalSuccessNoti: true,
        });
      })
      .catch((err) => {
        console.log("err", err);
        snackbarUtils.error(
          `Accept fail! ${
            err?.reason || "Please check your network connection"
          }`
        );
      })
      .finally((err) => {
        ownerGetListReceivedRequests();

        setState({
          isShowModalWaiting: false,
          isShowModalConfirm: false,
        });
      });
  };
  const handleCloseModalSuccessNoti = () => {
    setState({
      isShowModalSuccessNoti: false,
    });
  };
  return (
    <RequestWrapper>
      <div className="search-header text-right mb-2 d-flex justify-content-end">
        <CustomSearch placeholder="Search by name..." width={scrWidth>1200 ? "33%" : scrWidth>992 ? "50%" : "100%"} />
      </div>
      <div className="tab-change-header mb-3 d-flex justify-content-space-between">
        <MultipleButtonSelect
          options={[
            {
              text: `Request received ${
                ownerListReceivedRequests
                  ? ownerListReceivedRequests.length
                  : ""
              }`,
            },
            {
              text: `Request made ${
                buyerListSentRequests ? buyerListSentRequests.length : ""
              }`,
            },
          ]}
          onChange={(item, index) => {
            setState({
              tableType: index,
            });
          }}
        />
        <div className="pagination-top"></div>
      </div>
      <div className="requests-table mt-4">
        <BaseResponsive
          columns={columns}
          dataSource={
            state.tableType ? buyerListSentRequests : ownerListReceivedRequests
          }
          clientSearch={true}
          rowKey={"requestId"}
          callbackWhenSearch={(data = {}) => {
            setState({ ...data });
          }}
        />
      </div>
      <ModalConfirmRequest
        visible={state.isShowModalConfirm}
        onCancel={handleCloseModalConfirm}
        onOk={handleConfirm}
        responsePeriod={responsePeriod}
        currentTime={state.currentTime}
        data={state.currentRequestData}
      />
      <ModalWaitingConfirm visible={state.isShowModalWaiting} />
      <ModalSuccessNoti
        visible={state.isShowModalSuccessNoti}
        onCancel={handleCloseModalSuccessNoti}
        data={state.currentRequestData}
      />
    </RequestWrapper>
  );
};

export default Requests;
