import { CustomBreadCrumbWrapper } from "./styled";
import { RightOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

export const CircleBackground = () => {
  return (
    <>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
    </>
  );
};

export const CustomBreadCrumb = ({ arrayRouteFromParent }) => {
  return (
    <CustomBreadCrumbWrapper>
      {arrayRouteFromParent?.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={item?.link}>
            <span>{item?.text}</span>
          </Link>
          <RightOutlined />
        </React.Fragment>
      ))}
    </CustomBreadCrumbWrapper>
  );
};
