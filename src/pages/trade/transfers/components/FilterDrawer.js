import React from "react";
import { FilterDrawerWrapper } from "./styled";
import { Drawer } from "antd";
import TradeButton from "@components/TradeButton";
import { TickVioletIcon } from "@assets/svg";

const StateBtns = [
  {
    title: "All",
    value: null,
  },
  {
    title: "In",
    value: 1,
  },
  {
    title: "Out",
    value: 0,
  },
];

const TimeBtns = [
  {
    title: "All",
    value: null,
  },
  {
    title: "24 hours ago",
    value: 1,
  },
  {
    title: "30 days ago",
    value: 30,
  },
];

const StatusBtns = [
  {
    title: "All",
    value: null,
  },
  {
    title: "Success",
    value: 1,
  },
  {
    title: "Fail",
    value: 0,
  },
];

const FilterDrawer = ({
  visible,
  onClose,
  handleChangeParams,
  params,
  handleResetFilter,
  ...props
}) => {
  const { state, status, time } = params;
  const FilterItem = ({ title, filterItems, keyFilter, keyCompare }) => {
    return (
      <div className={title.toLowerCase()}>
        <h2>{title}</h2>
        <div className="d-flex">
          {filterItems?.map((item, index) => (
            <TradeButton
              key={index}
              fontSize={"20px"}
              content={item.title}
              type={"gray_black"}
              icon={item.value === keyCompare && <TickVioletIcon />}
              parentClassName="w-full mr-2"
              className={`d-flex align-items-center justify-content-center w-full p-3 ${
                item.value === keyCompare ? "active-filter" : ""
              }`}
              onClick={() => {
                handleChangeParams({ key: keyFilter, value: item.value });
              }}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <FilterDrawerWrapper
      {...props}
      onClose={onClose}
      visible={visible}
      title={<h1 className="filter-header">Filter by</h1>}
    >
      <div className="filter-body">
        <FilterItem
          title={"State"}
          keyFilter="state"
          filterItems={StateBtns}
          keyCompare={state}
        />
        <FilterItem
          title={"Status"}
          keyFilter="status"
          filterItems={StatusBtns}
          keyCompare={status}
        />
        <FilterItem
          title={"Time"}
          keyFilter="time"
          filterItems={TimeBtns}
          keyCompare={time}
        />
      </div>
      <div className="filter-footer">
        <div className="reset">
          <button className="reset-button" onClick={handleResetFilter}>
            Reset
          </button>
        </div>
      </div>
    </FilterDrawerWrapper>
  );
};

export default FilterDrawer;
