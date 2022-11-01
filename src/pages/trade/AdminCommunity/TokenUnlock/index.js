import { IHIIcon, IviIcon } from "@assets/svg";
import BaseResponsive from "@components/base/BaseResponsive";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenUnlockWrapper } from "./styled";

function TokenUnlock() {
  const getDatas = useDispatch()?.community?.getDatas;
  const getTokenCanUse = useDispatch()?.community?.getTokenCanUse;
  const getTokenUsed = useDispatch()?.community?.getTokenUsed;
  const getDataFromBscScan = useDispatch()?.contracts?.getDataFromBscScan;

  const datas = useSelector((state) => state?.community?.datas);
  const tokenCanUse = useSelector((state) => state?.community?.tokenCanUse);
  const tokenUsed = useSelector((state) => state?.community?.tokenUsed);

  const communityBalance = useSelector(
    (state) => state?.community?.communityBalance
  );
  const tokenTransferToSmartContract = useSelector(
    (state) => state?.contracts?.tokenTransferToSmartContract
  );
  const tokenClaimFromSmartContract = useSelector(
    (state) => state?.contracts?.tokenClaimFromSmartContract
  );
  useEffect(() => {
    getDatas();
    getTokenCanUse();
    getTokenUsed();
    getDataFromBscScan();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "#",
        dataIndex: "stt",
        key: "stt",
        width: "52px",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        width: "100px",
        align: "center",
        render: (time) => moment(time).format("DD-MM-YYYY"),
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        width: "200px",
        align: "center",
        render: (item) => {
          return item?.formatCurrency();
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "200px",
        align: "center",
        render: (status) =>
          status ? (
            "Unlock"
          ) : (
            <label style={{ color: "#ff4d4f" }}>Coming soon</label>
          ),
      },
    ],
    []
  );
  return (
    <TokenUnlockWrapper>
      <BaseResponsive
        action={
          <div className="header">
            <MultipleButtonSelect
              options={[
                { icon: <IviIcon />, text: "IVI" },
                { icon: <IHIIcon />, text: "IHI" },
              ]}
              content={tokenCanUse}
            />
          </div>
        }
        childrenTitle="NOTIFICATION"
        columns={columns}
        dataSource={datas}
        clientSearch={true}
        rowKey={"time"}
        summary={(data) => {
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  TOTAL TOKENS TRANSFERRED TO SMART CONTRACT
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {(tokenTransferToSmartContract || 0)?.formatCurrency() || 0}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              {/* <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  Token in Smart Contract{" "}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {communityBalance?.formatCurrency()}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row> */}
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  Token unlocked{" "}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {(tokenTransferToSmartContract <
                  datas?.filter((item) => item.status)?.reduceByKey("amount")
                    ? tokenTransferToSmartContract
                    : datas
                        ?.filter((item) => item.status)
                        ?.reduceByKey("amount")
                  )?.formatCurrency()}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  Token locked{" "}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {(communityBalance >
                  datas
                    ?.filter((item) => item.status)
                    ?.reduce((a, b) => a + b.amount, 0)
                    ? communityBalance -
                      datas
                        ?.filter((item) => item.status)
                        ?.reduce((a, b) => a + b.amount, 0)
                    : 0
                  )?.formatCurrency()}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  TOKEN USED IN CAMPAIGNS{" "}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {tokenUsed?.formatCurrency()}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>
                  TOKEN CLAIMED BY COMMUNITY
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {tokenClaimFromSmartContract?.formatCurrency() || 0}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={2}>Available</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} align="center">
                  {tokenCanUse?.formatCurrency()}
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </TokenUnlockWrapper>
  );
}

export default TokenUnlock;
