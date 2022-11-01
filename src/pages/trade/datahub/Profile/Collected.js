import { FilterTransfer } from "@assets/svg";
import TradeButton from "@components/TradeButton";
import TradePagination from "@components/TradePagination";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import AssetLikedProvider from "@data-access/liked-provider";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { CustomSearch } from "@pages/trade/components/styled";
import { Row } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import AssetItem from "../components/AssetItemCard";
import FilterDrawerDatahub from "../components/FilterDrawerDatahub";
import { GroupItemWrapper } from "../styled";
import ButtonFilterCollected from "./components/ButtonFilterCollected";
import FilterDrawerCollected from "./components/FilterDrawerCollected";

const Collected = (props) => {
  const {
    ownerListMigrateDataBySignature,
    ownerListPostedData,
    buyerListAcceptRequest,
    ownerListReportRequest,
    ownerGetCollectedData,
    ownerDecryptDataFromOwnedMetadataCid,
    buyerDecryptDataFromOwnedMetadataCid,
    listAdditionData,
    listDataAddress,
    updateDataSharing,
    updateDataSharingNested,
    userAddress,
    flag,
    owner,
    toggleChangeLike,
    sidebarFilterParams,
  } = props;
 
  const [state, _setState] = useState({
    dataSource: [],
    page: 0,
    size: 9,
    type: 1,
    isVisibleFilterDrawer: false,
    params: {
      filterCId: "",
      token: null,
      status: null,
      price: null,
      date: null,
    },
  });
  console.log(state?.isVisibleFilterDrawer);
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const statusObj = {
    CANBUY: 1,
    AUCTION: 2,
    GRANT: 3,
  };
  const { page, size, dataSource, type } = state;
  const migrateDataIgnorePostedData = (
    ownerListMigrateDataBySignature
      ? Object.keys(ownerListMigrateDataBySignature)
          ?.map((key) => ownerListMigrateDataBySignature[key])
          ?.filter((item) => {
            return ownerListPostedData.every(
              (subItem) => subItem?.dataCid !== item?.metadataCid
            );
          })
      : []
  ).filter((item) => !!item);
  // useEffect(() => {
  //   if (!flag && owner) {
  //     ownerGetCollectedData();
  //   }
  // }, [owner]);
  useEffect(() => {
    if (getDataByType(type)) {
      setDataByType(type);
    }
  }, [type, ownerListPostedData]);

  const setDataByType = (type) => {
    let newDataSource = getDataByType(type);
    setState({ dataSource: newDataSource, type });
    updateDataSharing({
      typeDataCollected: type,
    });
  };

  const getDataFromBE = async () => {
    let listAddress = listDataAddress;
    let { page, size } = state;
    if (listAddress && listAddress?.length > 0) {
      let params = {
        page,
        size,
        ids: listAddress?.join(","),
        userAddress,
      };
      DatahubAssetProvider.search(params)
        .then((res) => {
          if (res && res?.data?.code === 200) {
            updateDataSharingNested({
              collected: {
                listAdditionData: res?.data?.data,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const mergeDataFromRequest = (intergration, local) => {
    let mergeData = intergration?.map((item) => ({
      ...item,
      publicDetail: (local?.filter(
        (data) => data?.assetCId === (item?.dataCid || item?.metadataCid)
      ) || [])[0],
    }));
    return mergeData;
  };

  const getDataByType = (type) => {
    switch (type) {
      case 1:
        return ownerListPostedData;
      case 2:
        return migrateDataIgnorePostedData;
      case 3:
        return buyerListAcceptRequest;
      default:
        return ownerListReportRequest;
    }
  };
  const { scrWidth } = useSelector((state) => state.global);
  const handleChangeParams = debounce(({ key, value }) => {
    setState({
      page: 0,
      params: {
        ...state.params,
        [key]: value,
      },
    });
  }, 300);

  useEffect(() => {
    updateDataSharingNested({
      collected: {
        listDataAddress: state.dataSource
          ?.filter((item) => item !== null)
          ?.slice(state.page * state.size, state.page * state.size + state.size)
          ?.map((item) => item?.dataCid || item?.metadataCid),
      },
    });
  }, [state.page, state.size, state.dataSource]);

  useEffect(() => {
    getDataFromBE();
  }, [listDataAddress, state.dataSource, toggleChangeLike]);
  console.log("re-rendering");
  useEffect(() => {
    console.log(
      "Filter",
      (sidebarFilterParams?.tokens === 1 || sidebarFilterParams?.tokens === null
        ? getDataByType(type)
        : []
      )?.filter((item) => {
        if (sidebarFilterParams?.listStatus?.length === 0) return true;
        return sidebarFilterParams?.listStatus?.includes(
          statusObj[item?.status || "CANBUY"]
        );
      })
    );
    let newDataSource = (
      sidebarFilterParams?.tokens === 1 || sidebarFilterParams?.tokens === null
        ? getDataByType(type)
        : []
    )
      ?.filter((item) => {
        if (sidebarFilterParams?.listStatus?.length === 0) return true;
        return sidebarFilterParams?.listStatus?.includes(
          statusObj[item?.status || "CANBUY"]
        );
      })
      ?.filter((item) =>
        (item?.metadataCid || item?.dataCid)
          ?.toLowerCase()
          ?.includes(state?.params?.filterCId?.toLocaleLowerCase())
      )
      ?.filter((item) => {
        return (
          (item?.tokenAmount?.hexToDecimal() >=
            (sidebarFilterParams?.fromValue || 0) &&
            item?.tokenAmount?.hexToDecimal() <=
              (sidebarFilterParams?.toValue || Infinity)) ||
          type === 2
        );
      });
    if (
      (sidebarFilterParams?.listStatus?.length === 0 ||
        [1, 3].every((item) =>
          sidebarFilterParams?.listStatus?.includes(item)
        )) &&
      type === 1
    ) {
      console.log("Lọt");
      let buyNow =
        newDataSource
          ?.filter((item) => item?.status === "CANBUY")
          ?.sort(
            (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
          ) || [];
      let granted =
        newDataSource
          ?.filter((item) => item?.status === "GRANT")
          ?.sort(
            (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
          ) || [];

      newDataSource = [...buyNow, ...granted];
    } else if (type === 2) {
      // newDataSource = newDataSource?.sort(
      //   (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
      // );
    } else if (type === 3) {
      // newDataSource = newDataSource?.sort(
      //   (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
      // );
      console.log(newDataSource, "newDataSource");
      // newDataSource = newDataSource?.reverse();
    }
    console.log(newDataSource);
    setState({ dataSource: newDataSource });
  }, [
    state?.params?.filterCId,
    sidebarFilterParams,
    ownerListPostedData,
    type,
  ]);
  return (
    <GroupItemWrapper>
      <div className="search">
        <CustomSearch
          placeholder="Search by name..."
          width={scrWidth > 1200 ? "33%" : scrWidth > 992 ? "50%" : "100%"}
          onChange={(e) => {
            handleChangeParams({ key: "filterCId", value: e?.target?.value });
          }}
        />
        {scrWidth<992&&<TradeButton
          type={"transparent_white"}
          // content={"Filter Transfer"}
          icon={<FilterTransfer />}
          onClick={() =>
            setState({
              isVisibleFilterDrawer: true,
            })
          }
          style={{ border: "none" }}
        />}
      </div>
      <div className="category">
        <MultipleButtonSelect
          options={[
            {
              value: 1,
              text: `Listed ${
                ownerListPostedData?.filter((item) => item !== null)?.length ||
                0
              }`,
              handleClick: () => {
                updateDataSharingNested({
                  sidebarFilter: {
                    tokens: 1,
                    listStatus: [1],
                  },
                });
              },
            },
            {
              value: 2,
              text: `Owned ${
                migrateDataIgnorePostedData?.filter((item) => item !== null)
                  ?.length || 0
              }`,
              handleClick:()=>{
                setState({
                  page : 0
                })
              }
            },
            {
              value: 3,
              text: `Granted ${
                buyerListAcceptRequest?.filter((item) => item !== null)
                  ?.length || 0
              }`,
              handleClick: () => {
                updateDataSharingNested({
                  sidebarFilter: {
                    listStatus: [],
                  },
                });
                setState({
                  page : 0,
                })
              },
            },
            {
              value: 4,
              text: `Reported ${
                ownerListReportRequest?.filter((item) => item !== null)
                  ?.length || 0
              }`,
              handleClick:()=>{
                setState({
                  page : 0
                })
              }
            },
          ]}
          onChange={(obj) => {
            setState({ type: obj.value });
            updateDataSharing({ typeDataCollected: obj.value });
          }}
        />
      </div>
      <div className="group-items__head d-flex justify-content-space-between">
        <div className="result-number">
          <span>EMR</span>
          <span>{"  "}</span>
          <span>Result {state?.dataSource?.length || 0}</span>
        </div>
        <div className="page-info-top"></div>
      </div>
      {type === 1 && (
        <div className="d-flex mt-1 button-filter">
          {(sidebarFilterParams?.fromValue ||
            sidebarFilterParams?.toValue ||
            sidebarFilterParams?.tokens) && (
            <ButtonFilterCollected content={sidebarFilterParams} type="one" />
          )}
          {sidebarFilterParams?.listStatus?.map((item) => (
            <ButtonFilterCollected content={item} type="multi" />
          ))}
          {(sidebarFilterParams?.tokens ||
            sidebarFilterParams?.listStatus?.length > 0 ||
            sidebarFilterParams?.fromValue ||
            sidebarFilterParams?.toValue) && (
            <TradeButton
              content="Clear all"
              type={"gradient"}
              onClick={() => {
                updateDataSharingNested({
                  sidebarFilter: {
                    fromValue: null,
                    toValue: null,
                    listStatus: [],
                    tokens: null,
                    isResetPriceFilter: !sidebarFilterParams.isResetPriceFilter,
                  },
                });
              }}
            />
          )}
        </div>
      )}
      <div className="group-items__body">
        <Row gutter={[16, 16]}>
          {mergeDataFromRequest(
            dataSource
              ?.filter((item) => item !== null)
              ?.slice(page * size, page * size + size),
            listAdditionData
          )?.map((item, index) => (
            <AssetItem
              key={index}
              data={item}
              colResponsiveProps={{
                md: 12,
                lg: 12,
                xs: 12,
                sm: 12,
                xl: 8,
              }}
              ownerDecryptDataFromOwnedMetadataCid={
                ownerDecryptDataFromOwnedMetadataCid
              }
              buyerDecryptDataFromOwnedMetadataCid={
                buyerDecryptDataFromOwnedMetadataCid
              }
              type={state.type === 3}
              statusItem={type}
              handleLiked={AssetLikedProvider.changeLiked}
            />
          ))}
        </Row>
        <TradePagination
          className="mt-3"
          pageSizeOptions={[3, 5, 10, 15, 20]}
          total={dataSource?.length}
          defaultPageSize={9}
          defaultCurrent={0}
          onChange={(page, size) => {
            setState({
              page: page - 1,
              size: size,
            });
          }}
          current={state.page + 1}
          pageSize={state.size}
          showSizeChanger={true}
        />
      </div>
      <FilterDrawerCollected
        visible={state.isVisibleFilterDrawer}
        onClose={() => {
          setState({
            isVisibleFilterDrawer: false,
          });
        }}
        // filterCId={state?.filterCId}
        // fromValue={state?.filterNew?.fromValue}
        // toValue={state?.filterNew?.toValue}
        // filterCurrencies={state?.filterNew?.filterCurrencies}
        // filterStatus={state?.filterNew?.filterStatus}
        filterFunction={updateDataSharingNested}

        filterNew = {sidebarFilterParams}
        setState={setState}
      />
    </GroupItemWrapper>
  );
};

const mapStateToProps = ({
  datasharing: {
    ownerListMigrateDataBySignature,
    ownerListPostedData,
    buyerListAcceptRequest,
    ownerListReportRequest,
    collected: { listAdditionData, listDataAddress },
    flag,
    owner,
    changeLike,
    sidebarFilter,
  },
  contracts: { address },
}) => ({
  ownerListMigrateDataBySignature,
  ownerListPostedData,
  buyerListAcceptRequest,
  ownerListReportRequest,
  listAdditionData,
  listDataAddress,
  userAddress: address,
  flag,
  owner,
  toggleChangeLike: changeLike,
  sidebarFilterParams: sidebarFilter,
});

const mapDispatchToProps = ({
  datasharing: {
    ownerDecryptDataFromOwnedMetadataCid,
    ownerGetMigrateData,
    ownerGetPostDataToMarketplace,
    ownerGetCollectedData,
    buyerDecryptDataFromOwnedMetadataCid,
    updateData,
    updateNestedData,
  },
}) => ({
  ownerDecryptDataFromOwnedMetadataCid,
  ownerGetMigrateData,
  ownerGetPostDataToMarketplace,
  ownerGetCollectedData,
  buyerDecryptDataFromOwnedMetadataCid,
  updateDataSharing: updateData,
  updateDataSharingNested: updateNestedData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Collected);
