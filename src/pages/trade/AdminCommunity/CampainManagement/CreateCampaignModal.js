import { UploadExcel } from "@assets/svg";
import campaignProvider from "@data-access/campaign-provider";
import fileProvider from "@data-access/file-provider";
import notificationProvider from "@data-access/notification-provider";
import participantProvider from "@data-access/participant-provider";
import ModalHeader from "@pages/trade/components/ModalHeader";
import { LinearButton } from "@pages/trade/components/styled";
import { x10_18 } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Button } from "antd";
import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import readXlsxFile from "read-excel-file";
import ExcelDisplay from "./components/ExcelDisplay";
import InvalidTemplateDialog from "./components/InvalidTemplateDialog";
import { NewDragger as Dragger, NewModal as Modal } from "./styled";

const checkValidateTemplate = (data, setState) => {
  let { name, value, token, quantity, date, participants, timestampDate } =
    data;
  // Event name
  let checkName =
    typeof name === "string" ? name?.length <= 100 && name?.length > 0 : false;
  // Release Time
  let checkReleaseTime = date?.isValid();
  // Token
  let checkToken = typeof token === "string" && ["IVI", "IHI"].includes(token);
  // Campaign value and receiveable value
  let checkCampaignValue = participants?.every(
    (item) => typeof item?.amount === "number"
  );
  // walletaddress
  let checkWalletAddress = participants?.every(
    (item) => typeof item?.address === "string" && item?.address?.length > 0
  );

  if (
    checkName &&
    checkReleaseTime &&
    checkToken &&
    checkCampaignValue &&
    checkWalletAddress
  ) {
    return true;
  } else {
    setState({
      invalidTemplate: {
        checkName,
        checkReleaseTime,
        checkToken,
        checkCampaignValue,
        checkWalletAddress,
      },
    });
    return false;
  }
};

const CreateCampaignModal = (props, ref) => {
  const getDataFromBscScan = useDispatch()?.contracts?.getDataFromBscScan;
  const getAllCampaigns = useDispatch()?.community?.getAllCampaigns;
  const {
    transationsTransferToCommunity,
    totalTokenTransferToCommunity,
    transationsClaimFromCommunity,
    totalTokenClaimFromCommunity,
  } = useSelector((state) => state?.contracts);
  const { allCampaign } = useSelector((state) => state?.community);

  const symbol = useSelector((state) => state?.contracts?.symbol);
  const name = useSelector((state) => state?.auth?.auth?.data?.name);
  const createCampaign = useDispatch()?.community?.createCampaign;
  const uploadProps = {
    name: "file",
    maxCount: 1,
    showUploadList: false,
    customRequest: (data) => {
      const { file } = data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "campaign");
      readXlsxFile(file)
        .then((rows) => {
          let campaignName = rows[2][1];
          let date = moment(rows[3][1], "MM-DD-YYYY").format("DD-MM-YYYY");

          let timestampDate = Math.round(
            moment(rows[3][1], "MM-DD-YYYY").unix() / 1000
          );
          let newSymbol = rows[4][1];
          let participants = rows
            .slice(8, rows.length)
            .filter((row) => row[0] && row[1])
            .map((item) => ({ address: item[0], amount: item[1] }));
          if (
            checkValidateTemplate(
              {
                name: campaignName,
                value: participants.reduce((a, b) => a + b.amount, 0),
                token: newSymbol,
                quantity: participants.length,
                date: moment(rows[3][1]),
                participants,
                timestampDate,
              },
              setState
            )
          ) {
            fileProvider
              .upload({ form: formData })
              .then(async (res) => {
                setState({
                  fileName: file?.name,
                  filePath: res?.data?.[0],
                  name: campaignName,
                  value:
                    Math.round(
                      participants.reduce((a, b) => a + b.amount, 0) * 1e6
                    ) / 1e6,
                  token: symbol,
                  quantity: participants.length,
                  date,
                  participants,
                  timestampDate,
                  // isValidTemplate: "valid",
                });
                setValidTemplate("valid");
                setState({
                  toggleChangeFile: !state.toggleChangeFile,
                });
                // handleResetFileUpload();
              })
              .catch((err) => {
                snackbarUtils.error("Đã có lỗi xảy ra!");
              });
          } else {
            // setState({
            //   isValidTemplate: "invalid",
            // });
            setValidTemplate("invalid");
            setState({
              toggleChangeFile: !state.toggleChangeFile,
            });
            // handleResetFileUpload();
          }
        })
        .catch((error) => {
          console.log(error);
          snackbarUtils.error(
            "An error has occured when read your file. Please check your file template and try again!"
          );
          // handleResetFileUpload();
        });
    },
  };

  const { title } = props;
  const [state, _setState] = useState({
    isValidTemplate: "none",
    countTocheckValid: 0,
    isSaveDraft: false,
    visible: false,
    toggleChangeFile: true,
  });
  const [validTemplate, setValidTemplate] = useState("none");

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const callbackRef = useRef();
  useEffect(() => {
    if (
      allCampaign &&
      (totalTokenTransferToCommunity || 0) -
        (allCampaign?.reduce(
          (a, b) => a + b?.participants?.reduce((b, c) => b + c.amount, 0),
          0
        ) || 0) <
        state?.participants?.reduce((a, b) => a + b.amount, 0)
    ) {
      snackbarUtils.error(
        "Not enough money in Smart Contract for this campaign"
      );
    }
  }, [allCampaign, state.participants, totalTokenTransferToCommunity]);
  useImperativeHandle(ref, () => ({
    show: ({ callback, record }) => {
      getDataFromBscScan();
      getAllCampaigns();
      let obj = {
        visible: true,
        ...(record
          ? {
              record,
              fileName: record.name,
              filePath: record.filePath,
              name: record.name,
              participants: record.participants.map((item) => ({
                address: item.walletAddress,
                amount: item.amount,
              })),
              token: symbol,
              value:
                Math.round(
                  record.participants.reduce((a, b) => a + b.amount, 0) * 1e6
                ) / 1e6,
              quantity: record.participants.length,
              date: moment(record.openingDay).format("DD-MM-YYYY"),
              timestampDate: moment(record.openingDay, "DD-MM-YYYY").unix(),
              // isValidTemplate: "valid",
            }
          : {}),
      };

      setState(obj);
      callbackRef.current = callback;
    },
  }));
  const handleResetFileUpload = () => {
    _setState({});
    setValidTemplate("none");
  };
  const onCancel = () => {
    callbackRef.current();
    _setState({});
  };
  const address = useSelector((state) => state?.contracts?.address);
  const currentAddressObj = useSelector((state) => ({
    address: state.contracts.address,
    network: state.contracts.currentContractProperties.name,
  }));
  const handleNotivalidate = () => {
    if (validTemplate === "valid") {
      snackbarUtils.success("You have successfully uploaded a campaign!");
    } else if (validTemplate === "invalid") {
      snackbarUtils.error(
        <InvalidTemplateDialog data={state?.invalidTemplate} />
      );
    }
  };

  useEffect(() => {
    handleNotivalidate();
  }, [validTemplate, state.toggleChangeFile]);

  const handleCreateCampaign = (status) => {
    setState({ loading: true });
    let obj = {
      status,
      name: state.name,
      tokenName: state.token,
      filePath: state.filePath,
      participants: state?.participants.map((item) => ({
        walletAddress: item.address,
        amount: item.amount,
      })),
      openingDay: state?.date,
      fileName: state.fileName,
      network: currentAddressObj?.network,
    };
    let action = state?.record?.id
      ? campaignProvider.update
      : campaignProvider.create;

    obj.id = state?.record?.id;
    if (status === 10) {
      action(obj)
        .then(async (res) => {
          if (res.code === 0) {
            if (state?.record?.id) {
              await participantProvider.deleteMultiple(
                state?.record?.participants?.map((item) => item.id)
              );
            }
            await participantProvider.createMultiple(
              obj.participants.map((item) => ({
                walletAddress: item.walletAddress,
                amount: item.amount,
                campaignId: res.data.id,
                network: currentAddressObj?.network,
              }))
            );

            await notificationProvider.create({
              category: "Campaign",
              contentTitle: "Action needed",
              content: `${address} created ${state.name}. Signature required.`,
              network: currentAddressObj?.network,
            });
            snackbarUtils.success("Successfully save draft!");
            onCancel();

            // onCancel();
          } else if (res.code === 3001) {
            snackbarUtils.error(
              "Campaign name is already taken. Please choose a different name!"
            );
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          snackbarUtils.error("Create fail!");
        })
        .finally(() => {
          _setState({});
        });
    } else if (status === 20) {
      action(obj)
        .then(async (res2) => {
          if (res2.code === 0) {
            let participantRes;
            if (!state?.record?.id) {
              debugger;
              participantRes = await participantProvider.createMultiple(
                obj.participants.map((item) => ({
                  walletAddress: item.walletAddress,
                  amount: item.amount,
                  campaignId: res2.data.id,
                  network: currentAddressObj?.network,
                }))
              );
            }

            let notiRes = await notificationProvider.create({
              category: "Campaign",
              contentTitle: "Action needed",
              content: `${name} created ${state.name}. Signature required.`,
              network: currentAddressObj?.network,
            });
            await createCampaign({
              name: state.name,
              accounts: state.participants.map((item) => item.address),
              amounts: state.participants.map((item) => x10_18(item.amount)),
              claimTime: state.timestampDate,
            })
              .then((res) => {
                snackbarUtils.success(
                  "You have successfully created a campaign!"
                );
                onCancel();
              })
              .catch(async (err) => {
                console.log(err);
                console.log(
                  "%cXóa BE",
                  "background:yellow;color:red;font-size:40px"
                );
                await campaignProvider.delete(res2?.data?.id);
                await notificationProvider.delete(notiRes?.data?.id);
                await participantProvider.deleteMultiple(
                  participantRes?.data?.map((item) => item.id)
                );
                snackbarUtils.error(
                  `Request fail on blockchain! ${err?.reason}`
                );
                _setState({});
              });
          } else {
            snackbarUtils.error(
              <div>
                <div>Error code: {res2?.code}</div>
                <div>
                  Message: Campaign name is already taken. Please choose a
                  different name!
                </div>
              </div>
            );
          }
        })
        .catch((err) => {
          snackbarUtils.error(
            <div>
              <div>Error code: {err?.error?.code}</div>
              <div>Message: {err?.error?.data?.message}</div>
            </div>
          );
        });
    }
  };
  return (
    <Modal
      title={<ModalHeader title={title} callback={onCancel} />}
      visible={state.visible}
      onCancel={onCancel}
      closable={true}
      footer={
        <React.Fragment>
          <Button
            disabled={state.loading}
            className="save__btn"
            onClick={() => {
              handleCreateCampaign(10);
            }}
          >
            <img
              className="save-icon"
              src={require("@images/trade/save-icon.png")}
              alt=""
            />
            Save draft
          </Button>
          <LinearButton
            disabled={
              (allCampaign &&
                (totalTokenTransferToCommunity || 0) -
                  (allCampaign?.reduce(
                    (a, b) =>
                      a + b?.participants?.reduce((b, c) => b + c.amount, 0),
                    0
                  ) || 0) <
                  state?.participants?.reduce((a, b) => a + b.amount, 0)) ||
              state.loading
            }
            className="submit__btn"
            onClick={() => {
              handleCreateCampaign(20);
            }}
          >
            Request for approval
          </LinearButton>
        </React.Fragment>
      }
    >
      <Dragger {...uploadProps} accept=".xlsx">
        <div className="upload">
          <div className="upload__display">
            {!state.fileName ? (
              <UploadExcel />
            ) : (
              <ExcelDisplay fileName={state.fileName} />
            )}
          </div>
          <div className="upload__input">
            <div className="upload__input__reupload">
              <LinearButton>Change upload</LinearButton>
            </div>
            <div
              className={`upload__input__reset ${
                state.fileName ? "exist" : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                handleResetFileUpload();
              }}
            >
              {state.fileName
                ? "Reset upload your file"
                : "Drag or drop your files"}
            </div>
          </div>
        </div>
      </Dragger>
      <hr />
      <div className="description">
        <ul className="description__list">
          {[
            {
              key: "Campaign name",
              value: "name",
              // require: [
              //   state?.participants?.reduce((a, b) => a + b.amount, 0) >
              //     tokenCanUse,
              //   "** Tokens aren't enough to create new campaign",
              // ],
            },
            { key: "Campaign value", value: "value" },
            { key: "Token", value: "token" },
            { key: "Number of winner", value: "quantity" },
            { key: "Opening Date", value: "date" },
          ].map((item, index) => {
            return (
              <li className="description__list__item" key={index}>
                <div className="description__list__item__name">{item.key}</div>
                <div className="description__list__item__value">
                  {state[item.value]}
                </div>
                {item.require?.[0] && (
                  <div className="d-flex justify-content-end w-full">
                    <Button danger type="text">
                      {item.require?.[1]}
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default forwardRef(CreateCampaignModal);
