import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import {
  Dislike,
  Excel,
  Like,
  PenUnderline,
  Redirect,
  Trash,
  TrashAdmin,
} from "@assets/svg";
import BaseModal from "@components/base/BaseModal";
import BaseResponsive from "@components/base/BaseResponsive";
import DotIcon from "@components/DotIcon";
import campaignProvider from "@data-access/campaign-provider";
import notificationProvider from "@data-access/notification-provider";
import useInterval from "@hook/useInterval";
import { CustomSearch } from "@pages/trade/components/styled";
import { handleDownload } from "@utils/download-utils";
import snackbarUtils from "@utils/snackbar-utils";
import { Col, Descriptions, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { ButtonAdmin, IconAdmin } from "../Adminlist/components/AdminComponent";
import CreateCampaignModal from "./CreateCampaignModal";
import { CampainManagementWrapper } from "./styled";

const CampainManagement = (props) => {
  const {
    campaigns,
    countActiveAdmin,
    campaignTotalElement,
    campaignParams,
    getCampaigns,
    adminAcceptRelease,
    adminRejectRelease,
    release,
    setParams,
    deleteCampaign,
    network,
  } = props;
  const [viewRecord, setViewRecord] = useState({});
  const name = useSelector((state) => state?.auth?.auth?.data?.name);
  const genDataByStatus = (record) => {
    let status = record.status;
    let consent = record.consent;
    let approvalReject = [30, 40].includes(status)
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

    switch (status) {
      case 10:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              <IconAdmin type="high" tooltipText="Edit">
                <PenUnderline
                  onClick={() => {
                    createRef?.current?.show({
                      record,
                      callback: getCampaigns,
                    });
                  }}
                />
              </IconAdmin>
              <IconAdmin type="low" tooltipText="Delete">
                <TrashAdmin
                  onClick={() => {
                    snackbarUtils.confirm({
                      title: "You want to delete this campaign?",
                      onOk: () => {
                        campaignProvider
                          .delete(record.id)
                          .then((res) => {
                            if (res.code == 0) {
                              snackbarUtils.success(
                                "This campaign has been deleted successfully!"
                              );
                            } else {
                              throw new Error();
                            }
                          })
                          .catch(() => {
                            snackbarUtils.error("Delete fail!");
                          })
                          .finally(() => {
                            getCampaigns();
                          });
                      },
                    });
                  }}
                />{" "}
              </IconAdmin>
            </div>
          ),
          statusText: "Draft",
          approvalReject,
          dotColor: "#EA95BC",
        };

      case 20:
        return {
          action: (
            <div className="d-flex gap-10 justify-content-end">
              <IconAdmin
                disable={consent == 2}
                onClick={() => {
                  adminRejectRelease({ campaignName: record.name })
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
                onClick={() => {
                  adminAcceptRelease({ campaignName: record.name })
                    .then((res) => {
                      if ((record?.countAccept + 1) * 2 > countActiveAdmin) {
                        notificationProvider.create({
                          category: "Campaign",
                          contentTitle: "Action needed",
                          content: `Please launch campaign ${record.name}.`,
                          network,
                        });
                      }
                      snackbarUtils.success(
                        "You have successfully voted to accept!"
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                      snackbarUtils.error("Accept fail!");
                    });
                }}
                type="high"
                tooltipText="Accept"
              >
                <Like />{" "}
              </IconAdmin>
              <IconAdmin
                disable={record?.countAccept * 2 <= countActiveAdmin}
                onClick={() => {
                  release({ campaignName: record.name })
                    .then((res) => {
                      campaignProvider
                        .patch(record.id, { status: 30 })
                        .then((res2) => {
                          notificationProvider.create({
                            category: "Campaign",
                            contentTitle: "Action needed",
                            content: `${name} launched ${record.name}.`,
                            network,
                          });
                          snackbarUtils.success(
                            "This campaign has been released successfully!"
                          );
                          getCampaigns();
                        });
                    })
                    .catch((err) => {
                      console.log(err);

                      snackbarUtils.error("Release fail!");
                    });
                }}
                type="high"
                tooltipText="Release"
              >
                <Redirect />
              </IconAdmin>
              <IconAdmin
                disable={
                  countActiveAdmin != 1
                    ? record?.countReject * 2 <= countActiveAdmin - 1
                    : record?.countReject != 1
                }
                onClick={() => {
                  deleteCampaign({ campaignName: record.name })
                    .then((res) => {
                      campaignProvider
                        .patch(record.id, {
                          status: 40,
                        })
                        .then(() => {
                          snackbarUtils.success(
                            "This campaign has been deleted successfully!"
                          );
                          getCampaigns();
                        });
                    })
                    .catch((err) => {
                      console.log(err);

                      snackbarUtils.error("Delete fail!");
                    });
                }}
                type="high"
                tooltipText="Delete"
              >
                <Trash />
              </IconAdmin>
            </div>
          ),
          statusText: "Voting",
          approvalReject,
          dotColor: "#33E0C2",
        };
      case 30:
        return {
          action: null,
          statusText: "Completed",
          approvalReject,
          dotColor: "#0A9921",
        };

      default:
        return {
          action: null,
          statusText: "Rejected",
          approvalReject,
          dotColor: "#B0B0B0",
        };
    }
  };
  useEffect(() => {
    getCampaigns();
  }, [campaignParams]);
  useInterval(() => {
    getCampaigns();
  });

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      width: "52px",
      render: (data, dataObject, index) => {
        return campaignParams.page * campaignParams.size + index + 1;
      },
      xs: 24,
      sm: 24,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "100px",
      key: "status",
      sorter: true,
      render: (_, record) => {
        let data = genDataByStatus(record);

        return (
          <>
            <DotIcon color={data.dotColor} />
            <span>{data.statusText}</span>
          </>
        );
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Opening Date",
      dataIndex: "openingDay",
      key: "openingDay",
      width: "100px",
      sorter: true,
      render: (openingDay) => {
        return moment(openingDay)?.format("DD-MM-YYYY");
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Campaign name",
      dataIndex: "name",
      key: "name",
      width: "100px",
      xs: 24,
      sm: 12,
    },
    {
      title: "Campaign value",
      dataIndex: "campaignValue",
      key: "campaignValue",
      width: "100px",
      render: (_, record) =>
        Math.round(
          record?.participants.reduce((a, b) => a + b.amount, 0) * 1e6
        ) / 1e6,
      xs: 24,
      sm: 12,
    },
    {
      title: "Token",
      dataIndex: "tokenName",
      key: "tokenName",
      width: "100px",
      xs: 24,
      sm: 12,
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
      width: "100px",
      render: (_, record) => record?.participants?.length,
      xs: 24,
      sm: 12,
    },
    {
      title: "File uploaded",
      dataIndex: "filePath",
      key: "filePath",
      width: "100px",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="hover__high-light"
              onClick={() => {
                setViewRecord(record);
                viewRef.current.show({});
              }}
            >
              <Excel />
            </div>
            <div>
              <p
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100px",
                }}
              >
                {record.fileName}
              </p>
              <p
                style={{ color: "#1B76FF", cursor: "pointer" }}
                onClick={() => {
                  handleDownload(
                    record.filePath
                      .replaceAll("[", "%5B")
                      .replaceAll("]", "%5D")
                  );
                }}
              >
                Download
              </p>
            </div>
          </div>
        );
      },
      xs: 24,
      sm: 12,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: "100px",
      xs: 24,
      sm: 12,
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      width: "100px",
      render: (_, record) => genDataByStatus(record)?.approvalReject,
      xs: 24,
      sm: 12,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "200px",
      render: (_, record) => genDataByStatus(record)?.action,
      xs: 24,
      sm: 24,
      ignoreTitle: true,
    },
  ];
  const createRef = useRef();
  const linkRef = useRef();
  const viewRef = useRef();

  const handleChangeParams = (data = {}) => {
    setParams({
      ...data,
      key: "campaignParams",
    });
  };
  return (
    <CampainManagementWrapper>
      <BaseResponsive
        action={
          <Row
            gutter={[24, 24]}
            justify="space-between"
            style={{ marginBottom: "20px" }}
          >
            <Col xs={24} sm={12} lg={6}>
              {" "}
              <CustomSearch
                placeholder="Search by name..."
                onSearch={(value) => {
                  handleChangeParams({ name: value });
                }}
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Row gutter={[24, 24]} justify="end">
                <Col xs={12} sm={12}>
                  <ButtonAdmin
                    border
                    type={"special"}
                    onClick={() => {
                      linkRef.current.click();
                    }}
                  >
                    <div>
                      {" "}
                      <CloudDownloadOutlined style={{ fontSize: "150%" }} />
                    </div>
                    <div>
                      <text>Download</text>
                      <small>campain template</small>
                    </div>

                    <a
                      ref={linkRef}
                      href={require("@assets/excels/IVI_Vesting-Community_Campaign Template.xlsx")}
                      target="_blank"
                    ></a>
                  </ButtonAdmin>
                </Col>
                <Col xs={12} sm={12}>
                  <ButtonAdmin
                    type={"high"}
                    onClick={() => {
                      createRef?.current?.show({ callback: getCampaigns });
                    }}
                  >
                    <div>
                      {" "}
                      <CloudUploadOutlined style={{ fontSize: "150%" }} />
                    </div>
                    <div>
                      <text>Upload</text>
                      <small>new campaign</small>
                    </div>{" "}
                  </ButtonAdmin>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        childrenTitle="Campaign"
        columns={columns}
        dataSource={campaigns}
        total={campaignTotalElement}
        params={campaignParams}
        onChangeParams={handleChangeParams}
        filters={{
          status: {
            title: "Status",
            key: "statuses",
            options: [
              {
                label: "All",
                value: null,
              },
              {
                label: "Draft",
                value: 10,
              },
              {
                label: "Voting",
                value: 20,
              },
              {
                label: "Completed",
                value: 30,
              },
              {
                label: "Deleted",
                value: 40,
              },
            ],
          },
        }}
      />
      <CreateCampaignModal ref={createRef} title="Create New Campaign" />
      <BaseModal
        ref={viewRef}
        title={"View detail campaign"}
        ignoreOkButton
        renderForm={() => {
          return (
            <>
              <Descriptions title="Campaign info" bordered column={1}>
                <Descriptions.Item label="Event name">
                  {viewRecord.name}
                </Descriptions.Item>

                <Descriptions.Item label="Opening date">
                  {moment(viewRecord.openingDay).format("DD-MM-YYYY hh:mm:ss")}
                </Descriptions.Item>

                <Descriptions.Item label="Token">
                  {viewRecord.tokenName}
                </Descriptions.Item>

                <Descriptions.Item label="Value">
                  {Math.round(
                    viewRecord?.participants?.reduce(
                      (a, b) => a + b.amount,
                      0
                    ) * 1e6
                  ) / 1e6}
                </Descriptions.Item>
              </Descriptions>
              <br />
              <Table
                dataSource={viewRecord?.participants}
                clientSearch={true}
                rowKey="id"
                columns={[
                  {
                    title: "Wallet - Amount",
                    dataIndex: "walletAmount",
                    key: "walletAmount",
                    xs: 24,
                    sm: 12,
                    width: "200px",
                    responsive: ["xs"],
                    render: (_, record) => (
                      <>
                        <p>{record.walletAddress}</p>
                        <p>{record.amount}</p>
                      </>
                    ),
                  },
                  {
                    title: "Wallet",
                    dataIndex: "walletAddress",
                    key: "walletAddress",
                    xs: 24,
                    sm: 12,
                    width: "200px",
                    responsive: ["sm"],
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    xs: 24,
                    sm: 12,
                    width: "100px",
                    responsive: ["sm"],
                  },
                ]}
              />
            </>
          );
        }}
      />
    </CampainManagementWrapper>
  );
};

const mapStateToProps = ({
  community,
  contracts: { currentContractProperties },
}) => ({ ...community, network: currentContractProperties.name });
const mapDispatchToProps = ({ community }) => ({ ...community });
export default connect(mapStateToProps, mapDispatchToProps)(CampainManagement);
