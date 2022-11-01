import { CampainIcon, UserPlusIcon } from "@assets/svg";
import TradePagination from "@components/TradePagination";
import { List } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotiListWrapper } from "../styled";

const CategoryItem = ({ category }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      {category === "Campaign" ? <CampainIcon /> : <UserPlusIcon />}
      <span className="ml-2">{category}</span>
    </div>
  );
};

const NotiListItem = ({ notiData, address }) => {
  let {
    createdAt,
    category,
    countReader,
    requestAddresses,
    contentTitle,
    content,
  } = notiData;
  createdAt = new Date(createdAt);
  let isRead = requestAddresses?.includes(address);

  return (
    <div className={`noti-list-item${isRead ? "" : " unread"}`}>
      <div className="noti-list-item__head d-flex justify-content-space-between">
        <div className="noti-time">{`${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`}</div>
        <div className="noti-category">
          <CategoryItem category={category} />
        </div>
      </div>
      <div className="noti-list-item__body">
        <h3>{contentTitle}</h3>
        <p>
          <span>{content.slice(0, 42)}</span>
          <span>{content.slice(42)}</span>
        </p>
      </div>
    </div>
  );
};

const NotiList = ({ data, address }) => {
  const { scrWidth } = useSelector((state) => state.global);
  const [state, _setState] = useState({
    page: 0,
    size: 5,
  });
  const setParams = useDispatch()["community"].setParams;
  const { notificationParams, notificationTotalElements } = useSelector(
    (state) => state.community
  );
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const handleChangePage = (page, pageSize) => {
    setParams({
      page: page - 1,
      size: pageSize,
      key: "notificationParams",
    });
  };

  const { page, size } = notificationParams;
  return (
    <NotiListWrapper>
      <List
        className="list-notifications mb-3"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <NotiListItem notiData={item} address={address} />
          </List.Item>
        )}
      />
      <TradePagination
        pageSizeOptions={[3, 5, 10, 15, 20]}
        total={notificationTotalElements}
        defaultPageSize={size}
        defaultCurrent={1}
        onChange={handleChangePage}
        current={page + 1}
        showSizeChanger={true}
        showLessItems={scrWidth < 576 ? true : false}
      />
    </NotiListWrapper>
  );
};

export default NotiList;
