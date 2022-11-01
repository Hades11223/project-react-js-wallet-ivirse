import useLocalStorage from "@hook/useLocalStorage";
import LinearText from "@pages/trade/components/LinearText";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminList from "./Adminlist";
import TokenManagement from "./TokenManagement";
import Campain from "./CampainManagement";
import Notification from "./Notification";
import { Link, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { AdminWrapper, TabItem } from "./styled";
function AdminContainer({ history }) {
  // const [activeNavItem, setActiveNavItem] = useState(2);
  const { activeNavItem } = useSelector((state) => {
    return state.community;
  });
  const setActiveNavItem = useDispatch()?.community?.updateData;
  let community = useSelector((state) => {
    return state?.community;
  });

  const onChangeNav = (value) => {
    setActiveNavItem({ activeNavItem: value });
  };
  // const [tab, setTab] = useState(1);
  // useEffect(() => {
  //   setTab(activeNavItem);
  // }, [activeNavItem]);

  const { scrWidth } = useSelector((state) => state.global);

  const isAdmin = useSelector((state) => state?.community?.isAdmin);
  const data = useLocalStorage("role");
  useEffect(() => {
    if (!isAdmin || (data && data != "admin")) {
      history.push("/community");
    }
  }, [isAdmin, data]);
  const TabContent = [
    {
      component: <Notification />,
      title: "Notification",
      numberBadge: community?.notifications?.length || 0,
    },
    {
      component: <AdminList />,
      title: "Admin List",
    },
    {
      component: <TokenManagement />,
      title: "Token management",
    },
    {
      component: <Campain />,
      title: "Campaign",
    },
  ];

  return (
    <AdminWrapper>
      <LinearText
        title={"Admin"}
        fontSize={scrWidth > 992 ? "50px" : scrWidth > 576 ? "45px" : "40px"}
        lineHeight={scrWidth > 992 ? "55px" : scrWidth > 576 ? "50px" : "45px"}
        margin="10px"
      />

      <div className="content">
        <div className="content__tabs">
          {TabContent.map((item, index) => {
            return (
              <TabItem
                key={index}
                active={activeNavItem == index}
                onClick={() => {
                  onChangeNav(index);
                }}
              >
                {`${item.title} ${
                  item?.numberBadge ? `(${item.numberBadge})` : ""
                }`}
              </TabItem>
            );
          })}
        </div>
        <div className="content__data">
          {TabContent.map((item, index) => {
            if (index === activeNavItem) return item.component;
          })}
        </div>
      </div>
    </AdminWrapper>
  );
}

export default AdminContainer;
