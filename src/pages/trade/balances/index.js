import { Input } from "antd";
import { debounce } from "lodash";
// import Search from "antd/lib/transfer/search";
import { useCallback, useEffect, useState } from "react";
import { TradeTable } from "../components/styled";
import { StyledWrapper } from "./styled";

import TradePagination from "@components/TradePagination";
import { getLengthAddress } from "@utils";
import { AddressTooltip } from "../components/AddressTooltip";
import AlignDot from "../components/AlignDot";
import OpacityBox from "./Components/OpacityBox";
import useCustomState from "@hook/useCustomState";
import LinearText from "../components/LinearText";

const { Search } = Input;

export default function Balances({
  balances,
  getBalances,
  signer,
  erc20,
  currentContractProperties,
  updateBalance,
}) {
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return index + 1 + page * size;
      },
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: "20%",
      align: "center",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      width: "20%",
      render: (value) => <AlignDot>{value?.formatCurrency()}</AlignDot>,
      // render: (value) => value?.formatCurrency(),
    },
    {
      title: "Address",
      dataIndex: "addressCoin",
      key: "addressCoin",
      width: "35%",
      render: (address) => {
        return (
          <AddressTooltip
            address={address}
            getLengthAddress={getLengthAddress(address, window.innerWidth)}
          />
        );
      },
    },
  ];
  const [showData, setShowData] = useState(false);
  const [result, setResult] = useState(balances);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [state, _setState] = useState({
  //   page: 0,
  //   size: 3,
  // });
  // const setState = (data = {}) => {
  //   _setState((prev) => ({ ...prev, ...data }));
  // };

  const [state, setState] = useCustomState({
    page: 0,
    size: 3,
  });

  useEffect(() => {
    getBalances(setShowData);
  }, [currentContractProperties, updateBalance]);

  useEffect(() => {
    getData(balances);
  }, [balances]);

  useEffect(() => {
    const getScrWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", getScrWidth);

    return () => {
      window.removeEventListener("resize", getScrWidth);
    };
  }, []);

  const getData = (data) => {
    setResult(data);
  };

  const handleChangeSearch = (e) => {
    setResult(
      balances?.filter((balance) =>
        balance?.name?.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleChangePage = (page, pageSize) => {
    setState({
      page: page - 1,
      size: pageSize,
    });
  };

  const debounceSearch = useCallback(
    debounce((e) => handleChangeSearch(e), 1000)
  );
  const { page, size } = state;

  return (
    <StyledWrapper>
      <div className="balances-container">
        <div id="balances-window">
          <div id="balances-window-header">
            <LinearText
              title={"Token Balances"}
              className="mt-7"
              fontSize={window.innerWidth > 576 ? "50px" : "40px"}
              lineHeight={window.innerWidth > 576 ? "50px" : "40px"}
            />
            {/* <h1 id="balances-window-header-title">Token Balances</h1> */}
            <Search
              placeholder="Search token by name..."
              onChange={debounceSearch}
              className="search-table"
            />
          </div>
          {screenWidth >= 992 ? (
            <TradeTable
              loading={!showData}
              className="table-striped-rows"
              tableLayout="fixed"
              columns={columns}
              dataSource={result}
              rowKey={(record) => record?.addressCoin}
              pagination={{
                current: page + 1,
                defaultPageSize: 5,
                onChange: (page, pageSize) => {
                  setState({
                    page: page - 1,
                    size: pageSize,
                  });
                },
                showSizeChanger: true,
                pageSizeOptions: [3, 5, 10, 15, 20],
              }}
            />
          ) : (
            <>
              <div className="opacity-box-group-wrapper">
                {result
                  ?.slice(page * size, page * size + size)
                  ?.map((item, index) => (
                    <OpacityBox
                      key={index}
                      data={item}
                      scrWidth={screenWidth}
                    />
                  ))}
              </div>
              <TradePagination
                pageSizeOptions={[3, 5, 10, 15]}
                defaultCurrent={state.page}
                defaultPageSize={state.size}
                onChange={handleChangePage}
                total={result.length}
                current={state.page + 1}
              />
            </>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}
