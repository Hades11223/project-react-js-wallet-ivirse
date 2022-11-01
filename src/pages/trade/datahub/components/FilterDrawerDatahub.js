import { TickVioletIcon } from "@assets/svg";
import PriceRange from "@components/PriceRange";
import TradeButton from "@components/TradeButton";
import { Radio } from "antd";
import React from "react";
import { FilterDrawerDatahubWrapper } from "./styled";

function FilterDrawerDatahub({
  onClose,
  visible,
  handleChangeParams,
  filterFunction,
  setFilter,
  setState,
  handleResetFilter,
  filterNew,
}) {
  const TokenFilter = [
    {
      title: "IVI",
      value: 1,
      imgLink: require("@images/trade/datahub/IVI-icon.png"),
    },
    {
      title: "IHI",
      value: 2,
      imgLink: require("@images/trade/datahub/IHI-icon.png"),
    },
    {
      title: "USDT",
      value: 3,
      imgLink: require("@images/trade/datahub/USDT-icon.png"),
    },
  ];

  const StatusFilter = [
    {
      title: "Buy now",
      value: 1,
    },
    {
      title: "On Auction",
      value: 2,
    },
    {
      title: "Recently granted",
      value: 3,
    },
  ];

  const PriceFilter = {
    title: "Price range",
    addingChildren: (
      <div className="price-range-containter">
        <PriceRange
          placeholder={["From", "To"]}
          valuePrice={{
            fromValue: filterNew?.fromValue,
            toValue: filterNew?.toValue,
          }}
          setFilter={setFilter}
          handleChangeValue={(fromValue, toValue) => {
            setFilter({
              fromValue,
              toValue,
            });
            setState({
              page: 0,
            });
          }}
        />
      </div>
    ),
    filterChoice: [
      { title: "0-50", value: 1 },
      { title: "50-200", value: 2 },
      { title: "200-500", value: 3 },
      { title: "500-1000", value: 4 },
      { title: ">1000", value: 5 },
    ],
  };

  const DateFilter = [
    { label: "3 weeks", value: 1 },
    { label: "9 weeks", value: 2 },
    { label: "6 months", value: 3 },
    { label: "9 months", value: 4 },
    { label: "1 year", value: 5 },
  ];
  const FilterItem = ({ title, filterItems, keyFilter, keyCompare, type, classStyle }) => {
    return (
      <div className={title.toLowerCase()}>
        <h2>{title}</h2>
        <div>
          {type === "button" ? (
            <div className={`d-flex flex-wrap ${classStyle}`}>
              {filterItems?.map((item, index) => (
                <TradeButton
                  key={index}
                  fontSize={"14px"}
                  content={item.title}
                  type={"gray_black"}
                  style={keyFilter==="filterCurrencies"?{width : "100px"} : ""}
                  icon={
                    (keyFilter === "filterStatus" &&
                      keyCompare?.includes(item?.value) && <TickVioletIcon />) 
                  }
                  parentClassName=" mr-2"
                  className={`d-flex align-items-center justify-content-center item-filter p-3 mb-2 ${
                    keyFilter === "filterStatus" &&
                    keyCompare?.includes(index + 1)
                      ? "active-filter"
                      : ""
                  } ${
                    keyCompare - 1 === index ? "active-filter" : ""
                  } item-filter`}
                  onClick={() => {
                    // handleChangeParams({ key: keyFilter, value: item.value });
                    if (keyFilter === "filterStatus") {
                      if (keyCompare?.includes(item?.value)) {
                        let vitri = keyCompare?.findIndex(
                          (val) => val === item?.value
                        );
                        keyCompare.splice(vitri, 1);
                        filterFunction({ [keyFilter]: [...keyCompare] });
                      } else
                        filterFunction({
                          [keyFilter]: [...keyCompare, item?.value],
                        });
                    } else {
                      if (keyCompare === index + 1)
                        filterFunction({ [keyFilter]: null });
                      else filterFunction({ [keyFilter]: item?.value });
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <Radio.Group
              className="d-flex d-flex-column"
              options={filterItems}
              value={keyCompare}
              onChange={(value) => {
                handleChangeParams({
                  key: keyFilter,
                  value: value.target.value,
                });
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <FilterDrawerDatahubWrapper
      onClose={onClose}
      visible={visible}
      title={<h2 className="filter-header">Soft by</h2>}
    >
      <div>
        <FilterItem
          title={"Status"}
          keyFilter="filterStatus"
          filterItems={StatusFilter}
          keyCompare={filterNew?.filterStatus}
          type="button"
        />

        <FilterItem
          title={"Currencies"}
          keyFilter="filterCurrencies"
          filterItems={TokenFilter}
          keyCompare={filterNew?.filterCurrencies}
          type="button"
          classStyle = "d-flex-column "
        />
        {/* <FilterItem
          title={"Price"}
          keyFilter="price"
          filterItems={PriceFilter.filterChoice}
          keyCompare={price}
          type="button"
        /> */}
        {PriceFilter.addingChildren}
        {/* <FilterItem
          title={"Date Expire"}
          keyFilter="date"
          filterItems={DateFilter}
          keyCompare={date}
          type=""
        /> */}
        <div className="mt-">
          <TradeButton
            fontSize={14}
            content="Reset"
            colorText="#ffffff"
            className="reset-button"
            onClick={() => {
              handleResetFilter();
            }}
          />
        </div>
      </div>
    </FilterDrawerDatahubWrapper>
  );
}

export default FilterDrawerDatahub;
