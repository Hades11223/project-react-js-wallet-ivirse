import {
  CategoryIcon,
  FilterTransfer,
  HeartIcon,
  StatsIcon,
} from "@assets/svg";
import PriceRange from "@components/PriceRange";
import TradeButton from "@components/TradeButton";
import TradePagination from "@components/TradePagination";
import { assetStatusDatamarket } from "@constants/index";
import DatahubAssetProvider from "@data-access/datahub-asset-provider";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import GlobalIcons from "../components/GlobalIcons";
import MultipleButtonSelect from "../components/MultipleButtonSelect";
import { CustomSearch } from "../components/styled";
import ButtonFilterMarket from "./components/ButtonFilterMarket";
import FilterDrawerDatahub from "./components/FilterDrawerDatahub";
import GroupItem from "./components/GroupItem";
import { StaticComponent } from "./components/MainPageComponents";
import SidebarFilter from "./components/SidebarFilter";
import SidebarFilterItem from "./components/SidebarFilterItem";
import { DataHubMainWrapper } from "./styled";

const DataHub = ({
  buyerListPostedDataToMarketplace,
  listDataAddress,
  updateDataSharing,
  listAdditionData,
  changeLike,
  buyer,
  buyerGetListSentRequests,
  buyerListSentRequests,
  refreshDatahubFlag,
  navigatePageFlag,
}) => {
  const [state, _setState] = useState({
    page: 0,
    size: 9,
    filterData: [],
    filterCId: "",
    isVisibleFilterDrawer: false,
    listAssetRequest: [],
    filterNew: {
      filterCurrencies: null,
      fromValue: null,
      toValue: null,
      filterStatus: [],
      filterDate: null,
    },
    showFilter: {
      filterCurrencies: true,
      filterStatus: true,
      filterDate: false,
    },
  });
  const { filterNew } = state;
  const { filterCurrencies, filterStatus, filterDate, fromValue, toValue } =
    filterNew;
  const userAddress = useSelector((state) => state?.contracts?.address);
  const { scrWidth } = useSelector((state) => state.global);
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const handleResetFilter = () => {
    setState({
      filterNew: {
        filterCurrencies: null,
        filterStatus: [],
        filterDate: null,
        fromValue: null,
        toValue: null,
      },
    });
  };

  const setShowFilter = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      showFilter: {
        ...prev.showFilter,
        ...data,
      },
    }));
  };

  const setFilter = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      filterNew: {
        ...prev.filterNew,
        ...data,
      },
    }));
  };

  const handleChangeFilter = (item = {}) => {
    setFilter(item);
    setState({
      page: 0,
    });
  };

  const listFilter = [
    {
      title: "Status",
      ItemRender: SidebarFilterItem,
      filterFunction: handleChangeFilter,
      type: "newOne",
      listOptions: [
        { label: "Buy now", value: 1 },
        { label: "On Auction", value: 2 },
        { label: "Recently granted", value: 3 },
      ],
      actived: filterNew?.filterStatus,
      keyFilter: "filterStatus",
      filterNew: state?.filterNew?.filterStatus,
      setShowFilter: setShowFilter,
      show: state?.showFilter?.filterStatus,
    },
    {
      title: "Currencies",
      ItemRender: SidebarFilterItem,
      filterFunction: handleChangeFilter,
      type: "newOne",
      listOptions: [
        {
          label: "IVI",
          value: 1,
          imgLink: require("@images/trade/datahub/IVI-icon.png"),
        },
        {
          label: "IHI",
          value: 2,
          imgLink: require("@images/trade/datahub/IHI-icon.png"),
        },
        {
          label: "USDT",
          value: 3,
          imgLink: require("@images/trade/datahub/USDT-icon.png"),
        },
      ],
      keyFilter: "filterCurrencies",
      actived: filterNew.filterCurrencies,
      setShowFilter: setShowFilter,
      show: state?.showFilter?.filterCurrencies,
      AddingChildren: (
        <div className="price-range-containter">
          <PriceRange
            placeholder={["From", "To"]}
            setFilter={setFilter}
            valuePrice={{
              fromValue: state.filterNew.fromValue,
              toValue: state.filterNew.toValue,
            }}
            handleChangeValue={(fromValue, toValue) => {
              setFilter({
                fromValue,
                toValue,
              });
              setState({
                page: 0,
              });
            }}
            value={[state.filterNew.fromValue, state.filterNew.toValue]}
          />
        </div>
      ),
    },
    // {
    //   title: "",
    //   ItemRender: SidebarFilterItem,
    //   filterFunction: () => {},
    //   AddingChildren: (
    //     <div className="price-range-containter">
    //       <PriceRange
    //         placeholder={["From", "To"]}
    //         handleChangeValue={(fromValue, toValue) => {}}
    //       />
    //     </div>
    //   ),
    //   // type: "multiple",
    //   // listOptions: [
    //   //   { label: "0-50", value: 1 },
    //   //   { label: "50-200", value: 2 },
    //   //   { label: "200-500", value: 3 },
    //   //   { label: "500-1000", value: 4 },
    //   //   { label: ">1000", value: 5 },
    //   // ],
    // },
    // {
    //   title: "Expired date",
    //   ItemRender: SidebarFilterItem,
    //   filterFunction: handleChangeFilter,
    //   type: "newOne",
    //   listOptions: [
    //     { label: "3 weeks", value: 1 },
    //     { label: "9 weeks", value: 2 },
    //     { label: "6 months", value: 3 },
    //     { label: "9 months", value: 4 },
    //     { label: "1 year", value: 5 },
    //   ],
    //   actived: filterNew.filterDate,
    //   keyFilter: "filterDate",
    //   setShowFilter: setShowFilter,
    //   show: state?.showFilter?.filterDate,
    // },
  ];
  const buyerGetPostDataToMarketplace =
    useDispatch()?.datasharing?.buyerGetPostDataToMarketplace;
  // const buyerListPostedDataToMarketplace = useSelector(
  //   (state) => state?.datasharing?.buyerListPostedDataToMarketplace
  // );

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
            updateDataSharing({
              listAdditionData: res?.data?.data,
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
  const handleChangeParams = () => {};

  const handleDebounceSearch = debounce((e) => {
    setState({
      page: 0,
      filterCId: e?.target?.value,
    });
  }, 300);

  useEffect(() => {
    if (buyer) {
      buyerGetPostDataToMarketplace();
      // buyerGetListSentRequests();
    }
  }, [buyer, refreshDatahubFlag]);

  // useEffect(() => {
  //   let assetRequestedData = [];
  // }, [buyer, buyerListSentRequests]);
  useEffect(() => {
    updateDataSharing({
      listDataAddress: state?.filterData?.map(
        (item) => item?.dataCid || item?.metadataCid
      ),
    });
  }, [state.page, state.size, state?.filterData]);
  useEffect(() => {
    getDataFromBE();
  }, [listDataAddress, buyerListPostedDataToMarketplace, changeLike]);

  useEffect(() => {
    setState({
      filterData: buyerListPostedDataToMarketplace?.filter(
        (item) => item !== null
      ),
      // ?.slice(state.page * state.size, state.page * state.size + state.size),
    });
  }, [buyerListPostedDataToMarketplace]);

  useEffect(() => {
    const fromValue = state?.filterNew?.fromValue;
    const toValue = state?.filterNew?.toValue;
    let newData = (
      state?.filterNew?.filterCurrencies === 1 ||
      state?.filterNew?.filterCurrencies === null
        ? buyerListPostedDataToMarketplace
        : []
    )
      ?.filter((item) => item !== null)
      // ?.slice(state.page * state.size, state.page * state.size + state.size)
      ?.filter(
        (item) =>
          item?.tokenAmount?.hexToDecimal() >= (fromValue || 0) &&
          item?.tokenAmount?.hexToDecimal() <= (toValue || Infinity)
      )
      ?.filter((item) =>
        item?.dataCid?.toLowerCase()?.includes(state?.filterCId?.toLowerCase())
      )
      ?.filter((item) => {
        if (state?.filterNew?.filterStatus?.length === 0) return true;
        return state?.filterNew?.filterStatus?.includes(
          assetStatusDatamarket[item?.status || "CANBUY"]
        );
      });
    // if (
    //   filterNew.filterCurrencies === null &&
    //   !Boolean(filterNew.fromValue) &&
    //   !Boolean(filterNew.toValue) &&
    //   filterNew.filterStatus.length === 0
    // ) {
    //   newData = buyerListPostedDataToMarketplace;
    // }

    // Sort data with order:
    // First order follow Buynow, Granted
    // Second order follow by postedAt
    if (
      state?.filterNew?.filterStatus?.length === 0 ||
      [1, 3].every((item) => state?.filterNew?.filterStatus?.includes(item))
    ) {
      let buyNow =
        newData
          ?.filter((item) => item?.status === "CANBUY")
          ?.sort(
            (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
          ) || [];
      let granted =
        newData
          ?.filter((item) => item?.status === "GRANT")
          ?.sort(
            (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
          ) || [];
      // if (buyNow?.length > 0 && granted?.length > 0) {
      newData = [...buyNow, ...granted];
      // } else if (buyNow?.length > 0 && granted?.length < 1) {
      //   newData = [...buyNow]
      // }
    } else {
      newData = newData?.sort(
        (a, b) => b?.postedAt?.hexToNumber() - a?.postedAt?.hexToNumber()
      );
    }
    setState({
      filterData: newData,
    });
  }, [
    state?.filterCId,
    buyerListPostedDataToMarketplace,
    state?.filterNew?.fromValue,
    state?.filterNew?.toValue,
    state?.filterNew?.filterCurrencies,
    state?.filterNew?.filterStatus,
  ]);

  // Scroll when search effect
  useEffect(() => {
    localStorage.setItem("datahubFirst", true);

    return () => {
      localStorage.removeItem("datahubFirst");
    };
  }, []);
  useEffect(() => {
    let isDatahubFirst = localStorage.getItem("datahubFirst");
    if (
      isDatahubFirst === "true" &&
      ([
        state?.filterNew?.fromValue,
        state?.filterNew?.toValue,
        state?.filterNew?.filterCurrencies,
      ]?.some((item) => item !== null) ||
        state?.filterNew?.filterStatus?.length > 0 ||
        state?.filterCId !== "")
    ) {
      console.log("Vào");
      localStorage.setItem("datahubFirst", false);
    }
    let newIsDatahubFirst = localStorage.getItem("datahubFirst");
    // Scroll effect
    if (newIsDatahubFirst === "false") {
      let emr = document.querySelector("#data-hub-market-place");
      emr.scrollIntoView();
    }
  }, [
    state.page,
    state.size,
    state?.filterCId,
    state?.filterNew?.fromValue,
    state?.filterNew?.toValue,
    state?.filterNew?.filterCurrencies,
    state?.filterNew?.filterStatus,
  ]);

  return (
    <DataHubMainWrapper size={state.size}>
      <StaticComponent />
      <div id="data-hub-market-place">
        <div className="market-place-head d-flex align-items-center">
          <h1>Marketplace</h1>
          <img src="" alt="" />
          <div className="overflow-scroll-phong multi-button">
            <MultipleButtonSelect
              options={[
                { icon: <CategoryIcon />, text: "Explore" },
                { icon: <HeartIcon />, text: "Favorites" },
                { icon: <StatsIcon />, text: "Stats" },
              ]}
            />
          </div>
        </div>
        <div className="market-place-search text-right d-flex align-items-center justify-content-end">
          <CustomSearch
            width={scrWidth > 1200 ? "33%" : scrWidth > 992 ? "50%" : "100%"}
            placeholder="Search by name..."
            onChange={handleDebounceSearch}
          />
          {scrWidth < 992 && (
            <TradeButton
              type={"transparent_white"}
              // content={"Filter Transfer"}
              icon={<FilterTransfer />}
              onClick={() =>
                setState({
                  isVisibleFilterDrawer: true,
                })
              }
              style={{ border: "none" }}
            />
          )}
        </div>
        <div className="market-place-body d-flex">
          {scrWidth > 992 && (
            <div className="filter-sidebar__container">
              <SidebarFilter
                listFilter={listFilter}
                handleResetAllFilter={handleResetFilter}
              />
            </div>
          )}
          <div className="group-items">
            <div className="group-items__head d-flex justify-content-space-between">
              <div className="result-number" id="emr-result-checkpoint">
                <span>EMR: </span>
                <span>{"  "}</span>
                <span>{`(Result ${state?.filterData?.length || 0})`}</span>
              </div>
              <div className="page-info-top d-flex">{}</div>
            </div>
            <div className="d-flex align-items-center mt-2 button-filter">
              {(filterNew?.fromValue ||
                filterNew?.toValue ||
                filterNew?.filterCurrencies) && (
                <ButtonFilterMarket
                  content={filterNew}
                  type="one"
                  filterNew={filterNew}
                  updateNestedDataDispatch={handleChangeFilter}
                />
              )}
              {filterStatus?.map((item) => (
                <ButtonFilterMarket
                  content={item}
                  type="multi"
                  updateNestedDataDispatch={handleChangeFilter}
                  filterNew={filterNew}
                />
              ))}
              {(filterCurrencies ||
                filterStatus.length > 0 ||
                fromValue ||
                toValue) && (
                <TradeButton
                  content="Clear all"
                  type={"gradient"}
                  onClick={() => {
                    handleChangeFilter({
                      fromValue: null,
                      toValue: null,
                      filterStatus: [],
                      filterCurrencies: null,
                      // isResetPriceFilter: !sidebarFilterParams.isResetPriceFilter,
                    });
                  }}
                />
              )}
              {/* {filterDate && (
                <ButtonFilterMarket
                  content={
                    filterDate === 1
                      ? "3 weeks"
                      : filterDate === 2
                      ? "9 weeks"
                      : filterDate === 3
                      ? "6 months"
                      : filterDate === 4
                      ? "9 months"
                      : filterDate === 5
                      ? "1 year"
                      : ""
                  }
                  value={filterDate}
                  keyFilter="filterDate"
                  handleChangeFilter={handleChangeFilter}
                />
              )} */}
            </div>
            <div className="group-items__body">
              <GroupItem
                data={mergeDataFromRequest(
                  state?.filterData?.slice(
                    state.page * state.size,
                    state.page * state.size + state.size
                  ),
                  listAdditionData
                )}
              />
              \
              <TradePagination
                className="mt-3"
                pageSizeOptions={[1, 3, 6, 9, 15, 18]}
                total={state?.filterData?.length}
                defaultPageSize={state.size}
                defaultCurrent={state.page}
                onChange={(page, size) => {
                  setState({
                    page: page - 1,
                    size: size,
                  });
                  updateDataSharing({
                    navigatePageFlag: navigatePageFlag + 1,
                  });
                  localStorage.setItem("datahubFirst", false);
                }}
                current={state.page + 1}
                pageSize={state.size}
                showSizeChanger={true}
              />
              <FilterDrawerDatahub
                visible={state.isVisibleFilterDrawer}
                onClose={() => {
                  setState({
                    isVisibleFilterDrawer: false,
                  });
                }}
                filterCId={state?.filterCId}
                // fromValue={state?.filterNew?.fromValue}
                // toValue={state?.filterNew?.toValue}
                // filterCurrencies={state?.filterNew?.filterCurrencies}
                // filterStatus={state?.filterNew?.filterStatus}
                filterFunction={handleChangeFilter}
                setFilter={setFilter}
                setState={setState}
                handleResetFilter={handleResetFilter}
                filterNew={filterNew}
              />
            </div>
          </div>
        </div>
      </div>

      <GlobalIcons />
    </DataHubMainWrapper>
  );
};

const mapStateToProps = ({
  datasharing: {
    buyerListSentRequests,
    buyerListPostedDataToMarketplace,
    listDataAddress,
    listAdditionData,
    changeLike,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  },
}) => {
  return {
    buyerListSentRequests,
    buyerListPostedDataToMarketplace,
    listDataAddress,
    listAdditionData,
    changeLike,
    buyer,
    refreshDatahubFlag,
    navigatePageFlag,
  };
};

const mapDispatchToProps = ({
  datasharing: { buyerGetListSentRequests, updateData },
}) => ({
  updateDataSharing: updateData,
  buyerGetListSentRequests,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataHub);
