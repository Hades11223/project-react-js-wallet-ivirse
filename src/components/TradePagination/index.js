import React from "react";
import { Pagination } from "antd";
import TradePaginationWrapper from "./styled";

const TradePagination = (props) => {
  return (
    <TradePaginationWrapper>
      <Pagination {...props} />
    </TradePaginationWrapper>
  );
};

export default TradePagination;
