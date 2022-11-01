import {
  BitcoinConvertIcon,
  ClockIcon,
  ConvertCardWhiteIcon,
  FilterIcon,
  FilterTransfer,
  ReceiptIcon,
  TicketCircleIcon,
  XIcon,
} from "@assets/svg";
import TradeButton from "@components/TradeButton";
import TradePagination from "@components/TradePagination";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { Button, Input, Select } from "antd";
import { debounce } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddressTooltip } from "../components/AddressTooltip";
import LinearText from "../components/LinearText";
import { TradeTable } from "../components/styled";
import { P70 } from "../vesting/components/styled";
import FilterDrawer from "./components/FilterDrawer";
import OpacityBox from "./components/OpacityBox";
import { StyledWrapper } from "./styled";
import { getLengthAddress } from "@utils";
import useCustomState from "@hook/useCustomState";

const { Search } = Input;


export default function Transfers({
  getTransfers,
  transfers,
  currentNetworkProperties,
}) {
  const [state, setState] = useCustomState({
    // toggleTable: true- transaction| false- gas fee
    toggleTable: 1,
    // filter
    params: {
      status: null,
      state: null,
      name: "",
      time: null,
      page: 0,
      size : 3
    },
    // page, size
    page: 0,
    size: 3,
    // drawer
    isVisibleFilterDrawer: false,
    
  });
  const address = useSelector((state) => state?.contracts?.address);
  const columns = [
    {
      title: "No.",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 100,
      render: (data, dataObject, index) => {
        return 1 + (state.params.page ) * (state.params.size )+ index;
      },
    },
    ...(state.toggleTable == 2
      ? [
          // {
          //   title: "Value",
          //   dataIndex: "coinValue",
          //   key: "coinValue",
          //   align: "center",
          //   width: 200,
          //   render: (value) => <P70>{value}</P70>,
          // },
          {
            title: "Gas fee (BNB)",
            dataIndex: "gasFee",
            key: "gasFee",
            align: "center",
            width: 150,
            render: (value) => <P70>{value}</P70>,
          },
        ]
      : [
          {
            title: "Value",
            dataIndex: "tokenValue",
            key: "tokenValue",
            align: "center",
            width: 100,
            render: (value) => <P70>{value}</P70>,
          },
          {
            title: "Token",
            dataIndex: "token",
            key: "token",
            align: "center",
            width: 150,
            render: (_, record) =>
              `${record.tokenName} (${record.tokenSymbol})`,
          },
        ]),
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      width: 200,
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      align: "center",
      width: 150,
      render: (from) => {
        return (
          <AddressTooltip
            address={from}
            getLengthAddress={getLengthAddress(from, window.innerWidth)}
          />
        );
      },
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      align: "center",
      width: 150,
      render: (to) => (
        <AddressTooltip
          address={to}
          getLengthAddress={getLengthAddress(to, window.innerWidth)}
        />
      ),
    },
    {
      title: "State",
      dataIndex: "flow",
      key: "flow",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div>
          {record.from.toLowerCase() == address.toLowerCase() ? (
            <div className="TransferIcon">
              <div className="positionOut">
                <img
                  alt=""
                  className="state-icon"
                  src={require("../../../assets/images/out-icon.png")}
                ></img>
                <div className="icon-text">Out</div>
              </div>
            </div>
          ) : (
            <div className="TransferIcon">
              <img
                alt=""
                className="state-icon"
                src={require("../../../assets/images/in-icon.png")}
              ></img>
              <div className="icon-text">In</div>
            </div>
          )}
        </div>
      ),
    },
    // {
    //   title: "Block",
    //   dataIndex: "blockNumber",
    //   key: "blockNumber",
    //   align: "center",
    //   width: 100,
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "93px",
      render: (status) => (
        <div>
          {status == 1 ? (
            <div className="ts-status">
              <div className="ts-ck">
                <div className="green icon"></div>
              </div>
              <p className="ts-text">Success</p>
            </div>
          ) : (
            <div className="ts-status">
              <div className="ts-ck">
                <div className="red icon"></div>
              </div>
              <p className="ts-text">Fail</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Txn hash",
      dataIndex: "hash",
      key: "hash",
      align: "center",
      width: 100,
      render: (hash) => {
        return (
          <AddressTooltip
            address={hash}
            getLengthAddress={getLengthAddress(hash, window.innerWidth)}
          />
        );
      },
    },
  ];

  

  const setParams = (data = {}) => {
    setState({ params: { ...state.params, ...data } });
  };
  useEffect(() => {
    getTransfers({ type: state.toggleTable });
  }, [currentNetworkProperties, state.toggleTable]);

  const windowWidth = useDebounceWindowResize()?.width;

  useEffect(() => {
    setState({ data: transfers });
  }, [transfers]);

  const { params } = state;
  
  useEffect(() => {
    const { status, state, name, time } = params;
    let newData = transfers.filter((item) => {
      let checkName = name
        ? item?.tokenName?.toLowerCase()?.includes(name.toLowerCase())
        : true;
      let now = moment();
      let searchTime = now.subtract(time ? time : 0, "days");
      let checkTime = time
        ? searchTime <= moment(item.time, "DD-MM-YYYY HH:mm:ss")
        : true;

      let checkState = typeof state == "number" ? item.state == state : true;
      let checkStatus =
        typeof status == "number" ? item.status == status : true;

      return checkName && checkTime && checkState && checkStatus;
    });
    setState({ data: newData });
  }, [params, transfers]);

  useEffect(() => {
    let container = document.querySelector(".wrapper-container");
    container.scrollTo(0, 0);
  }, [state.page, params.page]);

  const handleToggleTable = (value) => {
    setState({
      toggleTable: value,
      page: 0,
      size: 3,
    });
  };
  const handleResetFilter = () => {
    setState({
      params: {
        status: null,
        state: null,
        name: "",
        time: null,
        page: 0,
      },
    });
  };

  const handleChangeParams = debounce(({ key, value }) => {
    setParams({ [key]: value, page: 0 });
  }, 300);

  const handleChangePage = (page, pageSize) => {
    setState({
      page: page - 1,
      size: pageSize,
    });
  };
  const handleOpenDrawerFilter = () => {
    setState({
      isVisibleFilterDrawer: true,
    });
  };
  const handleCloseDrawerFilter = () => {
    setState({
      isVisibleFilterDrawer: false,
    });
  };

  const { page, size } = state;

  return (
    <StyledWrapper>
      <div className="d-flex justify-content-space-between align-items-center mb-4">
        <LinearText
          style={{
            marginBottom: "0px",
          }}
          className=" mt-7"
          title={"Transfers"}
          fontSize={windowWidth>576 ? "50px" : "40px"}
          lineHeight={windowWidth>576 ? "50px" : "40px"}
        />
        {windowWidth>992&&<div className="filter-drawer-btn">
          <TradeButton
            type={"transparent_white"}
            content={"Filter Transfer"}
            icon={<FilterIcon />}
            onClick={handleOpenDrawerFilter}
          />
        </div>}
      </div>
      <div
        className="d-flex justify-content-space-between pt-4"
        id="transfer-toggle-and-search"
      >
        <div className="switch-table-btn d-flex">
          <TradeButton
            style={{ paddingLeft: "7px", marginRight: "10px" }}
            parentClassName={state.toggleTable === 1 ? "active-btn" : ""}
            type={"transparent_white"}
            icon={<ConvertCardWhiteIcon />}
            content="Transaction Detail"
            onClick={() => {
              handleToggleTable(1);
            }}
          />
          <TradeButton
            style={{ paddingLeft: "7px" }}
            parentClassName={state.toggleTable === 2 ? "active-btn" : ""}
            type={"transparent_white"}
            icon={<ReceiptIcon />}
            content="Gas Fee Detail"
            onClick={() => {
              handleToggleTable(2);
            }}
            // className="trade-button-content"
          />
        </div>
        <div className="search-table">
          <Search
            // value={params.name}
            placeholder="Search by token name..."
            className="search-input"
            onChange={(event) => {
              handleChangeParams({ key: "name", value: event.target.value });
            }}
          />
          {windowWidth<992&&<TradeButton
            type={"transparent_white"}
            // content={"Filter Transfer"}
            icon={<FilterTransfer />}
            onClick={handleOpenDrawerFilter}
            style={{border : "none"}}
          />}
        </div>
      </div>
      <div
        className="d-flex justify-content-space-between pt-4 pb-4"
        id="transfer-filter"
      >
        <div className="reset-btn-wrapper">
          <Button
            className="d-flex align-items-center button-reset-filter"
            onClick={handleResetFilter}
          >
            <XIcon />
            <span>Reset filter</span>
          </Button>
        </div>
        <div className="filter-group d-flex justify-content-space-around">
          <div className="custom-select-wrapper">
            <div className="select-prefix">
              <ClockIcon />
              <span>Time: </span>
            </div>
            <Select
              style={{ width: "100%" }}
              value={params.time}
              options={[
                { label: "All", value: null },
                { label: "24 hours ago", value: 1 },
                { label: "30 days ago", value: 30 },
              ]}
              onChange={(value) => {
                handleChangeParams({ key: "time", value });
              }}
            />
          </div>
          <div className="custom-select-wrapper">
            <div className="select-prefix">
              <TicketCircleIcon className="custom-css-icon" />
              <span>Status: </span>
            </div>
            <Select
              onChange={(value) => {
                handleChangeParams({ key: "status", value });
              }}
              style={{ width: "100%" }}
              value={params.status}
              options={[
                { label: "All", valeu: null },
                { label: "Success", value: 1 },
                { label: "Fail", value: 0 },
              ]}
            />
          </div>
          <div className="custom-select-wrapper">
            <div className="select-prefix">
              <BitcoinConvertIcon className="custom-css-icon" />
              <span>State: </span>
            </div>
            <Select
              onChange={(value) => {
                handleChangeParams({ key: "state", value });
              }}
              value={params.state}
              style={{ width: "100%" }}
              options={[
                { label: "All", value: null },
                { label: "Out", value: 0 },
                { label: "In", value: 1 },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="table-transfer">
        {window.innerWidth >= 992 ? (
          // <div></div>
          <TradeTable
            className="transfer-table"
            columns={columns}
            dataSource={state.data}
            scroll={{ x: 1250 }}
            rowKey={(record) => record.hash + record.to + record.time}
            pagination={{
              current: params.page +1,
              onChange: (page, pageSize) => {
                setParams({ 
                  page : page-1 , size : pageSize 
                });
              },
              showSizeChanger: true,
              pageSizeOptions: [2, 4, 10, 15, 20],
            }}
          />
        ) : (
          <>
            {state.data
              ?.slice(page * size, page * size + size)
              ?.map((item, index) => (
                <OpacityBox
                  keyChild={index}
                  data={item}
                  scrWidth={windowWidth}
                  toggleTable={state.toggleTable}
                />
              ))}
            <TradePagination
              pageSizeOptions={[3, 5, 10, 15, 20]}
              total={state?.data?.length}
              defaultCurrent={state.page + 1}
              onChange={handleChangePage}
              defaultPageSize={state.size}
              current={state.page + 1}
            />
          </>
        )}
      </div>
      {/* <FilterDrawer
        placement="right"
        onClose={handleCloseDrawerFilter}
        visible={state.isVisibleFilterDrawer}
      /> */}
      <FilterDrawer
        handleChangeParams={handleChangeParams}
        visible={state.isVisibleFilterDrawer}
        onClose={handleCloseDrawerFilter}
        params={state.params}
        handleResetFilter={handleResetFilter}
      />
    </StyledWrapper>
  );
}
