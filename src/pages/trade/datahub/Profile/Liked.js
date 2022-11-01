import TradePagination from "@components/TradePagination";
import AssetLikedProvider from "@data-access/liked-provider";
import { CustomSearch } from "@pages/trade/components/styled";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupItem from "../components/GroupItem";
import { LikedWrapper } from "./styled";

export default function Liked() {
  const [state, _setState] = useState({
    totalElements: 0,
    dataSource: [],
    params: {
      page: 0,
      size: 9,
    },
  });
  const {scrWidth} = useSelector(state=>state?.global)
  let { changeLike } = useSelector((state) => state.datasharing);
  const { dataSource, params, totalElements } = state;
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const setParams = (data = {}) => {
    let newParams = { ...params, ...data };
    setState({ params: newParams });
  };

  const debounceSearchByCId = debounce((e) => {
    setParams({
      assetCId: e?.target?.value,
      page: 0,
    });
  }, 300);
  const address = useSelector((state) => state?.contracts?.address);
  useEffect(() => {
    let searchParams = { ...params, address };
    AssetLikedProvider.searchByUserAddress(searchParams).then((res) => {
      if (res.status === 200) {
        setState({
          dataSource: res.data.data?.map((item) => ({
            dataCid: item?.assetCId,
            publicDetail: item,
          })),
          totalElements: res.data.totalElements,
        });
      }
    });
  }, [params, changeLike]);

  return (
    <LikedWrapper>
      <div className="market-place-search text-right d-flex justify-content-end">
        <CustomSearch
          placeholder="Search by name..."
          width={scrWidth>1200 ? "33%" : scrWidth>992 ? "50%" : "100%"}
          onChange={debounceSearchByCId}
        />
      </div>
      <div className="group-items">
        <div className="group-items__head d-flex justify-content-space-between">
          <div className="result-number">
            <span>EMR</span>
            <span>{"  "}</span>
            <span>{`(Result +${
              dataSource?.filter((item) => item !== null)?.length || 0
            })`}</span>
          </div>
          <div className="page-info-top"></div>
        </div>
        <div className="group-items__body">
          <GroupItem data={dataSource} />
          <TradePagination
            className="mt-3"
            pageSizeOptions={[3, 5, 10, 15, 20]}
            total={totalElements}
            defaultPageSize={9}
            defaultCurrent={1}
            onChange={(page, size) => {
              setParams({
                page: page - 1,
                size: size,
              });
            }}
            current={params.page + 1}
            pageSize={params.size}
            showSizeChanger={true}
          />
        </div>
      </div>
    </LikedWrapper>
  );
}
