import AssetLikedProvider from "@data-access/liked-provider";
import { Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./AssetItemCard";
import { GroupItemWrapper } from "./styled";

const GroupItem = ({ data }) => {
  const buyerDeposit = useDispatch()?.datasharing?.buyerDeposit;
  const buyerWithdrawable = useDispatch()?.datasharing?.buyerWithdrawable;

  const { buyerWithDrawable, buyer } = useSelector(
    (state) => state?.datasharing
  );
  useEffect(() => {
    if (buyer) buyerWithdrawable();
  }, [buyer]);
  return (
    <GroupItemWrapper>
      <Row gutter={[16, 16]}>
        {data?.map((item, index) => (
          <Item
            buyerWithDrawable={buyerWithDrawable}
            buyerWithdrawable={buyerWithdrawable}
            buyerDeposit={buyerDeposit}
            key={index}
            data={item}
            colResponsiveProps={{
              md: 12,
              lg: 12,
              xs: 12,
              sm: 12,
              xl: 8,
            }}
            handleLiked={AssetLikedProvider.changeLiked}
          />
        ))}
      </Row>
    </GroupItemWrapper>
  );
};

export default GroupItem;
