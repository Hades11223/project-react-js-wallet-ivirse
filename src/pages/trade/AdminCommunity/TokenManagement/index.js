import BaseResponsive from "@components/base/BaseResponsive";
import useCustomState from "@hook/useCustomState";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { formatPrice } from "@utils";
import { getLengthAddressByWindowScreen } from "@utils/index";
import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AmPieChart from "./AmPieChart";
import { TokenWrapper } from "./styled";

const TokenManagement = (props) => {
  const { width } = useDebounceWindowResize();
  //redux
  const getDataFromBscScan = useDispatch()?.contracts?.getDataFromBscScan;
  const getAllCampaigns = useDispatch()?.community?.getAllCampaigns;
  const {
    transationsTransferToCommunity,
    totalTokenTransferToCommunity,
    transationsClaimFromCommunity,
    totalTokenClaimFromCommunity,
  } = useSelector((state) => state?.contracts);
  const { allCampaign } = useSelector((state) => state?.community);
  //hook
  const [params, setParams] = useCustomState({});
  useEffect(() => {
    getDataFromBscScan();
    getAllCampaigns();
  }, []);
  const data1 = [
    {
      name: "Used in campaigns",
      value:
        allCampaign?.reduce(
          (a, b) => a + b?.participants?.reduce((b, c) => b + c.amount, 0),
          0
        ) || 0,
      color: "#FFB74B",
    },
    {
      name: "Available for future campaigns",
      value:
        totalTokenTransferToCommunity -
          allCampaign?.reduce(
            (a, b) => a + b?.participants?.reduce((b, c) => b + c.amount, 0),
            0
          ) || 0,
      color: "#FF7E21",
    },
  ];
  const data2 = [
    {
      name: "Token claimable",
      value:
        (allCampaign?.reduce(
          (a, b) => a + b?.participants?.reduce((b, c) => b + c.amount, 0),
          0
        ) || 0) - totalTokenClaimFromCommunity || 0,
      color: "#59D2D0",
    },
    {
      name: "Claimed by community",
      value: totalTokenClaimFromCommunity || 0,
      color: "#6A4FF0",
    },
  ];

  const columnsCampaignsValue = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      // width: "52px",
      width: "5%",
      // render: (_, __, index) => params.page * params.size + index + 1,
    },
    {
      title: "Time",
      // width: "200px",
      width: "15%",
      dataIndex: "timeStamp",
      key: "timeStamp",
      align: "left",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.timeStamp - b.timeStamp,
      render: (timeStamp) => {
        return moment.unix(timeStamp)?.format("DD-MM-YYYY HH:mm:ss");
      },
      // render: (item) => moment(item)?.format("DD-MM-YYYY HH:mm:ss"),
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      // sorter: true,
    },

    {
      title: "From",
      dataIndex: "from",
      key: "from",
      // width: "150px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (hash) => (
        <AddressTooltip
          address={hash}
          getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
        />
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      // width: "150px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (hash) => (
        <AddressTooltip
          address={hash}
          getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
        />
      ),
    },

    {
      title: "Value (BNB)",
      dataIndex: "gasFee",
      key: "gasFee",
      // width: "150px",
      width: "10%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (_, record) =>
        (Number(record.gasPrice) * Number(record.gasUsed)) / Math.pow(10, 18),
    },
    {
      title: "Value (IVI)",
      dataIndex: "value",
      key: "value",
      // width: "150px",
      width: "10%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (value) => formatPrice(Number(value) / Math.pow(10, 18)),
    },
    {
      title: "Txn Hash",
      dataIndex: "hash",
      key: "hash",
      // width: "200px",
      width: "20%",
      ignoreTitle: true,
      xs: 12,
      sm: 12,
      contentBold: true,
      render: (hash) => (
        <AddressTooltip
          address={hash}
          getLengthAddress={getLengthAddressByWindowScreen(hash, width)}
        />
      ),
    },
  ];
  return (
    <TokenWrapper>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12}>
          <AmPieChart nameChart={"TOKEN TRANSFERRED TO SMC"} data={data1} />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <AmPieChart nameChart={"TOKEN USED IN CAMPAIGNS"} data={data2} />
        </Col>
      </Row>
      <h1 className="title-table">Timeline</h1>
      <BaseResponsive
        childrenTitle="Token management"
        columns={columnsCampaignsValue}
        dataSource={transationsTransferToCommunity}
        clientSearch={true}
        rowKey={"blockHash"}
      />
    </TokenWrapper>
  );
};

export default TokenManagement;
