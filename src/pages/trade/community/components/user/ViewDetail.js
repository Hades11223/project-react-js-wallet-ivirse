import { EmptyLottie, LoadingCampaign } from "@assets/animation";
import { IvirseTokenLogo } from "@assets/svg";
import participantProvider from "@data-access/participant-provider";
import ModalHeader from "@pages/trade/components/ModalHeader";
import snackbarUtils from "@utils/snackbar-utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { NewModal as Modal } from "./styled";

const ViewItem = ({ name, value }) => {
  return (
    <div
      className="d-flex justify-content-space-between align-items-center"
      style={{ margin: "10px " }}
    >
      <div className="d-flex">
        <span style={{ marginRight: "10px" }}>
          {" "}
          <IvirseTokenLogo />
        </span>
        <span className="campaign-text">{name}</span>
      </div>
      <div>
        <span style={{ marginRight: "10px" }} className="token-text">
          {value}
        </span>
        <span>IVI</span>
      </div>
    </div>
  );
};

const ViewDetail = (props, ref) => {
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  useImperativeHandle(ref, () => ({
    show: ({ balance }) => {
      setState({ visible: true, balance });
    },
  }));
  const onCancel = () => {
    setState({ visible: false });
  };

  const network = useSelector(
    (state) => state?.contracts?.currentContractProperties?.name
  );

  const address = useSelector((state) => state?.contracts?.address);
  useEffect(() => {
    setState({ loading: true });
    participantProvider
      .getMultiple({
        page: 0,
        size: 9999,
        walletAddress: address,
        campaignStatus: 30,
        sort: { createdAt: "desc" },
        network,
      })
      .then((res) => {
        if (res.code == 0) {
          if (state?.visible) {
            let count = 0;
            let total = 0;
            for (let i = 0; i < res?.data?.length; i++) {
              if (total < state.balance) {
                total += res.data[i].amount;
                count++;
              }
            }
            setState({ data: res?.data.slice(0, count) });
          } else {
            setState({ data: res?.data });
          }
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        snackbarUtils.error("Error!");
      })
      .finally(() => {
        setTimeout(() => {
          setState({ loading: false });
        }, 2000);
      });
  }, [state.visible]);

  return (
    <Modal
      title={
        <ModalHeader title={"Detail Claim IVI Token"} callback={onCancel} />
      }
      visible={state.visible}
      onCancel={onCancel}
      closable={true}
      footer={null}
    >
      {state?.balance ? (
        state.loading ? (
          <LoadingCampaign />
        ) : (
          <>
            <div className="scroll">
              {state?.data?.map((item, key) => {
                return (
                  <ViewItem
                    name={item.campaignName}
                    value={item.amount}
                    key={key}
                  />
                );
              })}
            </div>

            <hr></hr>
            <div
              className="d-flex justify-content-space-between"
              style={{ margin: "10px " }}
            >
              <div className="token-text">Total Claim Token</div>
              <div>
                <span className="token-text" style={{ margin: "10px " }}>
                  {" "}
                  {state?.data?.reduce((a, b) => a + b.amount, 0)}
                </span>
                <span>IVI</span>
              </div>
            </div>
          </>
        )
      ) : (
        <EmptyLottie />
      )}
    </Modal>
  );
};

export default forwardRef(ViewDetail);
