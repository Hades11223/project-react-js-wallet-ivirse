import {
  Back,
  Cancel,
  Dislike,
  Like,
  PenUnderline,
  Propose,
  Redirect,
  Renounce,
  TrashAdmin,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import BaseResponsive from "@components/base/BaseResponsive";
import DotIcon from "@components/DotIcon";
import adminProvider from "@data-access/admin-provider";
import notificationProvider from "@data-access/notification-provider";
import useInterval from "@hook/useInterval";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { getLengthAddress,getLengthAddressByWindowScreen } from "@utils";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import snackbarUtils from "@utils/snackbar-utils";
import { Col, Form, Input, Row } from "antd";
import moment from "moment";
import { memo, useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { ButtonAdmin, IconAdmin } from "./components/AdminComponent";
import ModalConfirm from "./components/ModalConfirm";
import CreateAdminModal from "./CreateAdminModal";
import { AdminlistWrapper } from "./styled";

const Adminlist = (props) => {
  const { width } = useDebounceWindowResize();
  const currentAddressObj = useSelector((state) => ({
    address: state.contracts.address,
    network: state.contracts.currentContractProperties.name,
  }));
  const currentAdminName = useSelector(
    (state) => state?.auth?.auth?.data?.name
  );
  const {
    adminAccept,
    adminReject,
    renounceAdminRole,
    addAdmin,
    revokeAdminRole,
    getAdminData,
    setParams,
    countActiveAdmin,
    adminTotalElement,
    adminDatas,
    address,
    adminParams,
    auth,
  } = props;
  const genDataByStatus = (record) => {
    let status = record.status;
    let consent = record.consent;
    let approvalReject =
      status == 30
        ? "Done"
        : `${(
            ((record?.countAccept || 0) / (countActiveAdmin || 1)) *
            100
          )?.toFixed(2)}%` +
          " - " +
          `${(
            ((record?.countReject || 0) / (countActiveAdmin || 1)) *
            100
          )?.toFixed(2)}%`;
    const acceptFunc = () => {
      adminAccept(record.walletAddress)
        .then((res) => {
          snackbarUtils.success("You have successfully voted to accept!");
        })
        .catch((err) => {
          snackbarUtils.error("Accept fail!");
        });
    };
    const revokeFunc = () => {
      revokeAdminRole(record.walletAddress)
        .then((res) => {
          snackbarUtils.success(
            "You have successfully made your request to revoke an admin!"
          );
          adminProvider
            .patch(record.id, {
              status: 40,
              rejectAddresses: null,
            })
            .then(() => {
              setDependencyGetAdminData(!dependencyGetAdminData);
            });
        })
        .catch((err) => {
          console.log(err);

          snackbarUtils.error("Revoke fail!");
        });
    };
    const addFunc = () => {
      addAdmin(record.walletAddress)
        .then((res) => {
          snackbarUtils.success("Add success!");
          adminProvider
            .patch(record.id, {
              status: 30,
            })
            .then(() => {
              setDependencyGetAdminData(!dependencyGetAdminData);
            });
        })
        .catch((err) => {
          console.log(err);

          snackbarUtils.error("Add fail!");
        });
    };
    switch (status) {
      case 10:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              <IconAdmin
                disable={consent == 2}
                onClick={() => {
                  adminReject(record.walletAddress)
                    .then((res) => {
                      snackbarUtils.success(
                        "You have successfully voted to reject!"
                      );
                    })
                    .catch((err) => {
                      console.log(err);

                      snackbarUtils.error("Reject fail!");
                    });
                }}
                type="low"
                tooltipText="Reject"
              >
                <Dislike />
              </IconAdmin>
              <IconAdmin
                disable={consent == 1}
                onClick={acceptFunc}
                type="high"
                tooltipText="Accept"
              >
                <Like />{" "}
              </IconAdmin>
              <IconAdmin
                disable={
                  (record?.countAccept + (consent == 1 ? 0 : 1)) * 2 <=
                    countActiveAdmin && !(countActiveAdmin == 1)
                }
                onClick={addFunc}
                type="high"
                tooltipText="Add"
              >
                <Redirect />
              </IconAdmin>
              <IconAdmin
                type="low"
                tooltipText="Delete"
                onClick={() => {
                  snackbarUtils.confirm({
                    title: "You want to delete this admin?",
                    onOk: () => {
                      adminProvider
                        .patch(record.id, { status: 40 })
                        .then((res) => {
                          if (res.code == 0) {
                            snackbarUtils.success(
                              "You have successfully deleted!"
                            );
                          } else {
                            throw new Error();
                          }
                        })
                        .catch(() => {
                          snackbarUtils.error("Delete fail!");
                        })
                        .finally(() => {
                          setDependencyGetAdminData(!dependencyGetAdminData);
                        });
                    },
                  });
                }}
              >
                <TrashAdmin />{" "}
              </IconAdmin>
            </div>
          ),
          statusText: "Proposing",
          approvalReject,
          dotColor: "#ECDE2D",
        };

      case 20:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              <IconAdmin
                disable={consent == 2}
                onClick={() => {
                  adminReject(record.walletAddress)
                    .then((res) => {
                      snackbarUtils.success(
                        "You have successfully voted to reject! "
                      );
                    })
                    .catch((err) => {
                      console.log(err);

                      snackbarUtils.error("Reject fail!");
                    });
                }}
                type="low"
                tooltipText="Reject"
              >
                <Dislike />
              </IconAdmin>
              <IconAdmin
                disable={consent == 1}
                onClick={
                  acceptFunc
                  // record?.countAccept == 2
                  //   ? (record?.countAccept + (consent == 1 ? 0 : 1)) * 2 <=
                  //     countActiveAdmin
                  //     ? acceptFunc
                  //     : revokeFunc
                  //   : (record?.countAccept + (consent == 1 ? 0 : 1)) * 2 <=
                  //     countActiveAdmin - 1
                  //   ? acceptFunc
                  //   : revokeFunc
                }
                type="high"
                tooltipText="Accept"
              >
                <Like />{" "}
              </IconAdmin>
              <IconAdmin
                disable={
                  record?.countAccept == 2
                    ? (record?.countAccept + (consent == 1 ? 0 : 1)) * 2 <=
                      countActiveAdmin
                    : (record?.countAccept + (consent == 1 ? 0 : 1)) * 2 <=
                      countActiveAdmin - 1
                }
                onClick={revokeFunc}
                type="high"
                tooltipText="Revoke"
              >
                <Redirect />
              </IconAdmin>
              {record.walletAddress == address && (
                <IconAdmin
                  onClick={() => {
                    handleChangeName(record);
                  }}
                  type="high"
                  tooltipText="Edit"
                >
                  <PenUnderline />
                </IconAdmin>
              )}
            </div>
          ),
          statusText: "Revoking",
          approvalReject,
          dotColor: "#EA0000",
        };
      case 30:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              {address != record.walletAddress && (
                <IconAdmin
                  onClick={() => {
                    onOpenModalRevoke(record);
                  }}
                  type="medium"
                  tooltipText="Request revoke"
                >
                  <Cancel />
                </IconAdmin>
              )}

              {record.walletAddress == address && (
                <IconAdmin
                  onClick={() => {
                    handleChangeName(record);
                  }}
                  type="high"
                  tooltipText="Edit"
                >
                  <PenUnderline />
                </IconAdmin>
              )}
            </div>
          ),
          statusText: "Active",
          approvalReject,
          dotColor: "#0A9921",
        };

      default:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              <IconAdmin
                onClick={() => {
                  adminProvider
                    .patch(record.id, { status: 10 })
                    .then((res) => {
                      snackbarUtils.success("Request add success!");
                      setDependencyGetAdminData(!dependencyGetAdminData);
                    })
                    .catch((err) => {
                      console.log(err);

                      snackbarUtils.error("Request add fail!");
                    });
                }}
                type="high"
                tooltipText="Request back as admin"
              >
                <Back />{" "}
              </IconAdmin>
            </div>
          ),
          statusText: "Inactive",
          approvalReject: "",
          dotColor: "#B0B0B0",
        };
    }
  };
  const handleChangeName = (record) => {
    form.setFieldsValue(record);
    modalEditRef?.current?.show({
      callback: getAdminData,
      record,
      submit: () => {
        form.validateFields();
        let obj = form.getFieldsValue();
        adminProvider
          .patch(record.id, {
            name: obj.name,
          })
          .then(async (res) => {
            if (res.code == 0) {
              if (currentAdminName !== obj?.name) {
                await notificationProvider.create({
                  category: "Account",
                  contentTitle: "Action needed",
                  content: `< ${currentAdminName}> has changed his/her name to < ${obj?.name} >.`,
                  network: currentAddressObj?.network,
                });
              }
              snackbarUtils.success("You have successfully renamed!");
            } else {
              throw new Error();
            }
          })
          .catch((err) => {
            snackbarUtils.error("Edit fail!");
          });
      },
    });
  };
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      // width: "50px",
      width: "5%",
      render: (data, dataObject, index) => {
        return adminParams.page * adminParams.size + index + 1;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: "150px",
      width: "10%",
      render: (_, record) => {
        let data = genDataByStatus(record);

        return (
          <>
            <DotIcon color={data.dotColor} />
            <span>{data.statusText}</span>
          </>
        );
      },
      ignoreTitle: true,
      xs: 24,
      sm: 24,
    },
    {
      title: "Admin name",
      dataIndex: "name",
      key: "name",
      // width: "100px",
      width: "10%",
      xs: 24,
      sm: 12,
    },
    {
      title: "Wallet address",
      dataIndex: "walletAddress",
      key: "walletAddress",
      // width: "100px",
      width: "20%",
      render: (walletAddress) => (
        <AddressTooltip
          address={walletAddress}
          getLengthAddress={getLengthAddressByWindowScreen(walletAddress, width)}
        />
      ),
      xs: 24,
      sm: 12,
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      // width: "250px",
      width: "15%",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY HH:mm:ss"),
      xs: 24,
      sm: 12,
    },
    {
      title: "Active date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      // width: "250px",
      width: "15%",
      render: (updatedAt) => moment(updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      xs: 24,
      sm: 12,
    },
    {
      title: "Approved - Rejected",
      dataIndex: "approvedRject",
      key: "approvedRject",
      // width: "150px",
      width: "15%",
      render: (_, record) => genDataByStatus(record)?.approvalReject,
      xs: 24,
      sm: 12,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      // width: "50px",
      width: "10%",
      render: (_, record) => genDataByStatus(record)?.action,
      xs: 24,
      sm: 24,
      ignoreTitle: true,
    },
  ];

  const createRef = useRef();
  const modalRenouceRef = useRef({});
  const modalRevokeRef = useRef({});
  const modalEditRef = useRef();
  const [revokeData, setRevokeData] = useState({});

  const [dependencyGetAdminData, setDependencyGetAdminData] = useState(true);

  useEffect(() => {
    getAdminData();
  }, [adminParams, dependencyGetAdminData]);
  useInterval(() => {
    getAdminData();
  }, 5000);
  const handleChangeParams = (data = {}) => {
    setParams({
      ...data,
      key: "adminParams",
    });
  };

  const handleRenounce = () => {
    modalRenouceRef?.current?.close();
    renounceAdminRole()
      .then((res) => {
        snackbarUtils.success("Renounce success!");

        adminProvider.patch(auth?.data?.id, {
          status: 40,
          rejectAddresses: null,
        });
      })
      .catch((err) => {
        console.log(err);

        snackbarUtils.error("Renounce fail!");
      });
  };
  const onOpenModalRenouce = () => {
    modalRenouceRef?.current?.show();
  };

  const handleRevoke = () => {
    let record = { ...revokeData };
    if (countActiveAdmin <= 1) {
      snackbarUtils.error("You are last admininstator!");
      modalRevokeRef?.current?.close();
      return;
    }
    adminProvider
      .patch(record.id, { status: 20 })
      .then((res) => {
        snackbarUtils.success("Revoke success!");
        setDependencyGetAdminData(!dependencyGetAdminData);
      })
      .catch((err) => {
        console.log(err);

        snackbarUtils.error("Revoke fail!");
      });
    modalRevokeRef?.current?.close();
  };
  const onOpenModalRevoke = (record) => {
    modalRevokeRef?.current?.show();
    setRevokeData(record);
  };
  const [form] = Form.useForm();

  return (
    <AdminlistWrapper>
      <BaseResponsive
        action={
          <div className="header">
            <Row
              gutter={[24, 24]}
              justify="end"
              style={{ marginBottom: "20px" }}
            >
              <Col xs={24} sm={12} lg={6}>
                <Row gutter={[24, 24]} justify="end">
                  <Col xs={12} sm={12}>
                    <ButtonAdmin
                      border
                      type={"special"}
                      onClick={onOpenModalRenouce}
                    >
                      <div>
                        {" "}
                        <Renounce />
                      </div>
                      <div>
                        <text>Renounce</text>
                        <small>admin role</small>
                      </div>
                    </ButtonAdmin>
                  </Col>
                  <Col xs={12} sm={12}>
                    <ButtonAdmin
                      type={"high"}
                      onClick={() => {
                        createRef?.current?.show({ callback: getAdminData });
                      }}
                    >
                      <div>
                        {" "}
                        <Propose />
                      </div>
                      <div>
                        <text>Propose</text>
                        <small>new admin</small>
                      </div>{" "}
                    </ButtonAdmin>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        }
        childrenTitle="ADMIN LIST"
        columns={columns}
        dataSource={adminDatas}
        total={adminTotalElement}
        params={adminParams}
        onChangeParams={handleChangeParams}
        filters={{
          status: {
            title: "Status",
            key: "status",
            options: [
              {
                label: "All",
                value: null,
              },
              {
                label: "Proposing",
                value: "10",
              },
              {
                label: "Revoking",
                value: "20",
              },
              {
                label: "Active",
                value: "30",
              },
              {
                label: "Inactive",
                value: "40",
              },
            ],
          },
        }}
      />
      <CreateAdminModal ref={createRef} />

      <ModalConfirm
        type={"Renounce"}
        ref={modalRenouceRef}
        onOk={handleRenounce}
      />
      <ModalConfirm type={"Revoke"} ref={modalRevokeRef} onOk={handleRevoke} />

      <BaseModal
        ref={modalEditRef}
        title="Edit profile"
        submitText="Edit"
        renderForm={() => {
          return (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              labelAlign="left"
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input admin's name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Wallet Address" name="walletAddress">
                <Input disabled />
              </Form.Item>
            </Form>
          );
        }}
      />
    </AdminlistWrapper>
  );
};

const mapStateToProps = ({
  community: { countActiveAdmin, adminTotalElement, adminDatas, adminParams },
  contracts: { address },
  auth: { auth },
}) => ({
  countActiveAdmin,
  adminTotalElement,
  adminDatas,
  address,
  adminParams,
  auth,
});

const mapDispatchToProps = ({
  community: {
    adminAccept,
    adminReject,
    renounceAdminRole,
    addAdmin,
    revokeAdminRole,
    getAdminData,
    setParams,
    getCountActiveAdmin,
  },
}) => ({
  adminAccept,
  adminReject,
  renounceAdminRole,
  addAdmin,
  revokeAdminRole,
  getAdminData,
  setParams,
  getCountActiveAdmin,
});
export default connect(mapStateToProps, mapDispatchToProps)(memo(Adminlist));
