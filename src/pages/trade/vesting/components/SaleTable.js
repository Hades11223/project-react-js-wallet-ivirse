import TradeButton from "@components/TradeButton";
import TradePagination from "@components/TradePagination";
import { TradeTable } from "@pages/trade/components/styled";
import snackbarUtils from "@utils/snackbar-utils";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpacityBoxGroup from "./OpacityBoxGroup";

const priceStyle = { width: "55%", textAlign: "right", marginBottom: "0px" };
const SaleTable = ({
  data,
  seedTokenCanClaim,
  releasePublicToken,
  releasePublicTokenByIndex,
}) => {
  const setLoading = useDispatch()?.global?.setLoading;
  let seedAmountIsZero = data.every((item) => item.amountSeed == 0);
  let privateAmountIsZero = data.every((item) => item.amountPrivate == 0);

  let columns = [
    {
      title: "Milestone",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: "20%",
    },
    ...(seedAmountIsZero
      ? []
      : [
          {
            title: "Seed Sale",
            dataIndex: "amountSeed",
            key: "amountPublic",
            align: "center",
            width: "20%",
            render: (item) => {
              return <p style={priceStyle}>{item?.formatCurrency()}</p>;
            },
          },
        ]),
    ...(privateAmountIsZero
      ? []
      : [
          {
            title: "Private Sale",
            dataIndex: "amountPrivate",
            key: "amountPrivate",
            align: "center",
            width: "20%",
            render: (item) => {
              return <p style={priceStyle}>{item?.formatCurrency()}</p>;
            },
          },
        ]),

    ...(seedAmountIsZero || privateAmountIsZero
      ? []
      : [
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
            align: "center",
            width: "20%",
            render: (total) => {
              return <p style={priceStyle}>{total?.formatCurrency()}</p>;
            },
          },
        ]),
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "20%",
      render: (status, record) => {
        return status == 4 ? (
          "Lock"
        ) : status == "1" ? (
          <div style={{ color: "#FF7E27" }}>Coming soon</div>
        ) : status == "2" ? (
          <div style={{ color: "#6E5AC3" }}>Claimed</div>
        ) : (
          <TradeButton
            parentClassName="d-flex justify-content-center"
            content={"Claim"}
            type="gradient"
            onClick={() => {
              let api = releasePublicTokenByIndex;
              setLoading(true);
              api(record.index)
                .then((res) => {
                  snackbarUtils.success("Claim successfully!");
                })
                .catch((err) => {
                  snackbarUtils.error("The transaction is declined!");
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        );
      },
    },
  ];
  const { scrWidth } = useSelector((state) => state.global);
  const page = useSelector((state) => state?.vesting?.page);
  const setPage = useDispatch()?.vesting?.setPage;
  const [state, _setState] = useState({
    page: 0,
    size: 5,
  });

  const handleChangePage = (page, pageSize) => {
    setState({
      page: page-1,
      size: pageSize,
    });
  };

  const setState = (data = {}) => {
    _setState((prev) => ({ ...state, ...data }));
  };

  useEffect(() => {
    setPage(1);
  }, [data]);
  const arrayStatusToken = data.map((item) => {
    return item.status;
  });

  //  Do 2 nguoi dung 1 nguoi dung redux, 1 nguoi dung state thuong.
  useEffect(() => {
    let container = document.querySelector(".wrapper-container");
    container.scrollTo(0,0);
  }, [state.page, page])

  const checkClaimAbleToken = !arrayStatusToken.includes(3)||seedTokenCanClaim === 0;

  return scrWidth > 992 ? (
    <TradeTable
      pagination={{
        current: page,
        onChange: setPage,
        showSizeChanger:true,
        pageSizeOptions:[5,10,20,50,100]
      }}
      className="main-table"
      columns={columns}
      dataSource={data}
      rowKey={(record) => record?.date + record?.status}
      scroll={{ x: "1300" }}
      rowClassName={() => "rowClassName"}
      summary={(pageData) => {
        return (
          <React.Fragment>
            <Table.Summary.Row>
              <Table.Summary.Cell
                colSpan={seedAmountIsZero || privateAmountIsZero ? 1 : 3}
                align="center"
              >
                Total remaining claimable token{" "}
              </Table.Summary.Cell>

              <Table.Summary.Cell align="center">
                <p style={priceStyle}>{seedTokenCanClaim?.formatCurrency()}</p>
              </Table.Summary.Cell>
              <Table.Summary.Cell align="center">
                <TradeButton
                  disabled={checkClaimAbleToken}
                  parentClassName={"d-flex justify-content-center"}
                  type= {checkClaimAbleToken ? "gray_black" : "green"}
                  content={"Claim all"}
                  onClick={() => {
                    setLoading(true);
                    releasePublicToken(seedTokenCanClaim)
                      .then((res) => {
                        snackbarUtils.success("Claim successfully!");
                      })
                      .catch((err) => {
                        snackbarUtils.error("The transaction is declined!");
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </React.Fragment>
        );
      }}
    />
  ) : (
    <>
      <OpacityBoxGroup
        data={data?.slice(
          state.page * state.size,
          state.page * state.size + state.size
        )}
        checkClaimAbleToken= {checkClaimAbleToken}
        setDisabled={setLoading}
        releasePublicToken={releasePublicToken}
        seedTokenCanClaim={seedTokenCanClaim}
        seedAmountIsZero={seedAmountIsZero}
        privateAmountIsZero={privateAmountIsZero}
        releasePublicTokenByIndex={releasePublicTokenByIndex}
      />
      <TradePagination
        pageSizeOptions={[5, 10, 15]}
        defaultCurrent={state.page + 1}
        defaultPageSize={state.size}
        onChange={handleChangePage}
        total={data.length}
        showSizeChanger={true}
        showLessItems={true}
      />
    </>
  );
};

export default SaleTable;
