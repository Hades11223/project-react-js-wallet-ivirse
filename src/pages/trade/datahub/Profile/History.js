import { CustomSearch, TradeTable } from "@pages/trade/components/styled";
import React from "react";
import { HistoryWrapper } from "./styled";

import useCustomState from "@hook/useCustomState";
import { debounce } from "lodash";
import { useCallback } from "react";
import ProgressBar from "../components/ProgressBar";
import { dataHistory } from "./dataProfile";

import DotIcon from "@components/DotIcon";
import { useState } from "react";
import { useSelector } from "react-redux";
import OpacityBox from "./components/OpacityBox";

function History() {
  const [state, setState] = useCustomState({
    page: 0,
    size: 5,
  });

  const [result, setResult] = useState(dataHistory);
  const { scrWidth } = useSelector((state) => state.global);
  const handleChangeSearch = (e) => {
    setResult(
      dataHistory?.filter((data) =>
        data?.dataId?.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const debounceSearch = useCallback(
    debounce((e) => handleChangeSearch(e), 1000)
  );

  const statusArr = [
    {
      name: "Active",
      color: "green",
    },
    {
      name: "Available",
      color: "blue",
    },
    {
      name: "Granted",
      color: "red",
    },
    {
      name: "Accessable",
      color: "yellow",
    },
  ];

  const { page, size } = state;
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return page * size + index + 1;
      },
      width: "5%",
    },
    {
      title: "Data ID",
      dataIndex: "dataId",
      key: "dataId",
      width: "10%",
    
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      width: "10%",
      //   align: "center",
    },
    {
      title: "Expired date",
      dataIndex: "expiredDate",
      key: "expiredDate",
      //   align: "center",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (data, dataObject, index) => {
        return (
          <>
            <DotIcon color={statusArr[data - 1].color} />
            <span>{statusArr[data - 1].name}</span>
          </>
        );
      },
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: "35%",
      render: (data) => {
        switch (data) {
          case 1:
            return (
              <>
                <b>{data}/3: Pending</b>
                <ProgressBar data={data} total={3} />
              </>
            );
          case 2:
            return (
              <>
                <b>{data}/3: Checking Report</b>
                <ProgressBar data={data} total={3} />
              </>
            );
          case 3:
            return (
              <>
                <b>{data}/3: Succesfully</b>
                <ProgressBar data={data} total={3} />
              </>
            );
        }
      },
    },
  ];
  return (
    <HistoryWrapper>
      <div className="history-container">
        <div className="history-header">
          <CustomSearch
            onChange={debounceSearch}
            placeholder="Search by name..."
            className="history-header-search"
          />
        </div>
        {scrWidth > 992 ? (
          <div className="history-contain">
            <div className="history-contain-result">
              <span>EMR</span>
              <span>{"  "}</span>
              <span>(Result {result.length}+)</span>
            </div>
            <TradeTable
              ableLayout="fixed"
              columns={columns}
              dataSource={result}
              // defaultPageSize = {state.size}
              // rowKey={(record) => record?.addressCoin}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["3", "5", "10", "20", "30"],
                onChange: (page, pageSize) => {
                  setState({
                    page: page - 1,
                    size: pageSize,
                  });
                },
              }}
            />
          </div>
        ) : (
          <div className="history-contain-mobile">
            {dataHistory.map((item, index) => {
              return (
                <OpacityBox
                  dataId={item.dataId}
                  owner={item.owner}
                  expiredDate={item.expiredDate}
                  activity={item.activity}
                  dotStatus={statusArr[item.status - 1]}
                />
              );
            })}
          </div>
        )}
      </div>
    </HistoryWrapper>
  );
}

export default History;
