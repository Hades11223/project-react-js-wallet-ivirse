import LinearText from "@pages/trade/components/LinearText";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileWrapper, TabItem } from "./styled";

import {
  ArrowDown,
  ArrowUp,
  IconCollected,
  IconLiked,
  RequestIcon,
} from "@assets/svg";
import PriceRange from "@components/PriceRange";
import TradeButton from "@components/TradeButton";
import useCustomState from "@hook/useCustomState";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { Link, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SidebarFilter from "../components/SidebarFilter";
import SidebarFilterItem from "../components/SidebarFilterItem";
import Collected from "./Collected";
import Liked from "./Liked";
import Requests from "./Requests";

function Profile({
  updateNestedDataSharing,
  sidebarFilter,
  ownerGetCollectedData,
}) {
  const TabContent = [
    // {
    //   component: DashBoard,
    //   title: "DashBoard",
    //   icon: <IconDashBoard />,
    //   path: "/data-hub/profile",
    //   exact: true,
    // },

    {
      component: Collected,
      title: "Collected",
      icon: <IconCollected />,
      path: "/data-hub/profile/collected",
      onClick: ownerGetCollectedData,
    },
    {
      component: Requests,
      title: "Request",
      icon: <RequestIcon />,
      path: "/data-hub/profile/requests",
    },
    // {
    //   component: History,
    //   title: "History",
    //   icon: <IconHistory />,
    //   path: "/data-hub/profile/history",
    // },
    {
      component: Liked,
      title: "Favorites",
      icon: <IconLiked />,
      path: "/data-hub/profile/liked",
    },
  ];
  const handleResetAllFilter = () => {};
  const [showMore, setShowMore] = useState(0);
  const [state, setState] = useCustomState({
    showFilter: {
      filterCurrencies: true,
      filterPrices: true,
    },
    isResetPriceFilter: false,
  });
  const listFilter = [
    {
      title: "Status",
      ItemRender: SidebarFilterItem,
      filterFunction: (data = []) => {
        updateNestedDataSharing({
          sidebarFilter: {
            listStatus: data,
          },
        });
      },
      type: "multiFilterCollected",
      listOptions: [
        { label: "Buy Now", value: 1 },
        { label: "On Auction", value: 2 },
        { label: "Recently granted", value: 3 },
      ],
    },
    {
      title: "Token",
      ItemRender: SidebarFilterItem,
      filterFunction: (data = null) => {
        updateNestedDataSharing({
          sidebarFilter: {
            tokens: data,
          },
        });
      },
      type: "oneFilterCollected",
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
    },

    // {
    //   title: "Status",
    //   ItemRender: SidebarFilterItem,
    //   filterFunction: (status) => {
    //     updateNestedDataSharing({
    //       sidebarFilter: {
    //         listStatus: status,
    //       },
    //     });
    //   },
    //   type: "multiple",
    //   listOptions: [
    //     { label: "Buy now", value: 1 },
    //     { label: "On Auction", value: 2 },
    //   ],
    // },
    {
      title: "Price",
      ItemRender: SidebarFilterItem,
      filterFunction: () => {},
      AddingChildren: (
        <div className="price-range-containter">
          <PriceRange
            placeholder={["From", "To"]}
            handleChangeValue={(fromValue, toValue) => {
              updateNestedDataSharing({
                sidebarFilter: {
                  fromValue,
                  toValue,
                },
              });
            }}
            value={[sidebarFilter.fromValue, sidebarFilter.toValue]}
          />
        </div>
      ),
      show: true,
      // type: "multiple",
      // listOptions: [
      //   { label: "0-50", value: 1 },
      //   { label: "50-200", value: 2 },
      //   { label: "200-500", value: 3 },
      //   { label: "500-1000", value: 4 },
      //   { label: ">1000", value: 5 },
      // ],
    },
    // {
    //   title: "Expired date",
    //   ItemRender: SidebarFilterItem,
    //   filterFunction: () => {},
    //   type: "one",
    //   listOptions: [
    //     { label: "3 weeks", value: 1 },
    //     { label: "9 weeks", value: 2 },
    //     { label: "6 months", value: 3 },
    //     { label: "9 months", value: 4 },
    //     { label: "1 year", value: 5 },
    //   ],
    // },
  ];
  const navActiveProfile = useSelector((state) => state.global.navProfile);
  const { scrWidth } = useSelector((state) => state.global);
  const setNavProfile = useDispatch()?.global?.setNavProfile;
  const { typeDataCollected } = useSelector((state) => state?.datasharing);
  const onChangeNav = (index) => {
    setNavProfile(index);
    setShowMore(0);
  };
  return (
    <ProfileWrapper>
      <LinearText
        title={"Profile"}
        fontSize={scrWidth > 992 ? "50px" : scrWidth > 576 ? "45px" : "40px"}
        lineHeight={scrWidth > 992 ? "55px" : scrWidth > 576 ? "50px" : "45px"}
        margin="10px"
      />

      <div className="content">
        <div className="content__tabs">
          {scrWidth > 992 ? (
            TabContent.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Link to={item.path} onClick={item?.onClick}>
                    <TabItem
                      key={index}
                      onClick={() => {
                        onChangeNav(index);
                      }}
                      active={window.location.pathname === item.path}
                    >
                      <span className="content__tabs-item">
                        <span className="content__tabs-item-icon">
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </span>
                    </TabItem>
                  </Link>
                  {[0].includes(navActiveProfile) &&
                    typeDataCollected === 1 &&
                    navActiveProfile === index &&
                    (showMore === 0 ? (
                      <div className="show-more">
                        <a onClick={() => setShowMore(1)}>More filter</a>{" "}
                        <ArrowDown />
                      </div>
                    ) : (
                      <>
                        <div className="show-more">
                          <a onClick={() => setShowMore(0)}>Show less</a>{" "}
                          <ArrowUp />
                        </div>
                        <div className="filter-sidebar__container">
                          <SidebarFilter
                            listFilter={listFilter}
                            handleResetAllFilter={handleResetAllFilter}
                          />
                        </div>
                      </>
                    ))}
                </React.Fragment>
              );
            })
          ) : (
            <div gutter={[32, 16]} className="content__tabs-mobile overflow-scroll-phong">
              {TabContent.map((item, index) => {
                return (
                  <div key={index} >
                    <Link to={item.path}>
                      <TradeButton
                        style={
                          scrWidth > 576
                            ? {
                                fontSize: "15px",
                                padding: "15px",
                                width: "140px",
                              }
                            : {
                                fontSize: "14px",
                                padding: "18px",
                                width: "140px",
                              }
                        }
                        type={"transparent_white"}
                        icon={item.icon}
                        parentClassName={
                          navActiveProfile === index ? "active-btn" : ""
                        }
                        content={item.title}
                        onClick={() => {
                          onChangeNav(index);
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="content__data">
          <Switch>
            {TabContent.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          </Switch>
        </div>
      </div>
    </ProfileWrapper>
  );
}

const mapStateToProps = ({ datasharing: { sidebarFilter } }) => ({
  sidebarFilter,
});
const mapDispatchToProps = ({
  datasharing: { updateNestedData, ownerGetCollectedData },
}) => ({
  updateNestedDataSharing: updateNestedData,
  ownerGetCollectedData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
