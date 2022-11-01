import TradeButton from "@components/TradeButton";
import React from "react";
import { SidebarFilterWrapper } from "./styled";

const SidebarFilter = ({ listFilter, handleResetAllFilter }) => {
  return (
    <SidebarFilterWrapper>
      {listFilter?.map((item, index) => {
        return (
          <div className="filter-group_wrapper" key={index}>
            <item.ItemRender
              title={item?.title}
              listOptions={item?.listOptions}
              filterFunction={item?.filterFunction}
              type={item?.type}
              AddingChildren={item?.AddingChildren}
              keyFilter={item?.keyFilter}
              actived ={item?.actived}
              filterNew = {item?.filterNew}
              show = {item?.show}
              setShowFilter = {item?.setShowFilter}
            />
          </div>
        );
      })}
      {/* <TradeButton
        className="w-full text-center"
        type={"gradient"}
        content="Clear all"
        onClick={handleResetAllFilter}
      /> */}
    </SidebarFilterWrapper>
  );
};

export default SidebarFilter;
