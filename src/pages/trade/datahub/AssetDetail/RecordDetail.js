import {
  CdhaIcon,
  DanhSachDichVuIcon,
  KetQuaKhamIcon,
  KetQuaXetNghiemIcon,
  PhauThuatIcon,
  ProfileDataIcon,
  ThuocIcon,
} from "@assets/svg";
import useCustomState from "@hook/useCustomState";
import { Divider } from "@pages/trade/vesting/components/styled";
import React from "react";
import { useSelector } from "react-redux";
import DividerProvide from "./components/DividerProvide";
import CDHA from "./components/RecordPage/CDHA";
import Medicine from "./components/RecordPage/Medicine";
import MedicResult from "./components/RecordPage/MedicResult";
import ProfileRecord from "./components/RecordPage/ProfileRecord";
import ServiceList from "./components/RecordPage/ServiceList";
import Surgery from "./components/RecordPage/Surgery";
import TestResult from "./components/RecordPage/TestResult";
import ResponsiveRecord from "./components/ResponsiveRecord";
import { RecordDetailWrapper } from "./styled";

function HOC(Component, props) {
  return <Component {...props} />;
}

function RecordDetail(props) {
  const { data, dataResult, dataDetail } = props;
  const {scrWidth} = useSelector(state=>state.global)
  const [state, setState] = useCustomState({
    navActive: 0,
  });
  const { navActive } = state;

  const headerNav = [
    {
      component: ProfileRecord,
      title: "Profile",
      icon: ProfileDataIcon,
      length: 10,
    },
    {
      component: ServiceList,
      title: "Danh sách dịch vụ",
      icon: DanhSachDichVuIcon,
      length: 17,
    },
    {
      component: MedicResult,
      title: "Kết quả khám",
      icon: KetQuaKhamIcon,
      length: 14.5,
    },
    {
      component: TestResult,
      title: "KQ xét nhiệm",
      icon: KetQuaXetNghiemIcon,
      length: 13.8,
    },
    {
      component: CDHA,
      title: "CDHA & TDCN",
      icon: CdhaIcon,
      length: 14.5,
    },
    {
      component: Surgery,
      title: "Phẫu thuật/ Thủ thuật",
      icon: PhauThuatIcon,
      length: 21.2,
    },
    {
      component: Medicine,
      title: "Thuốc",
      icon: ThuocIcon,
      length: 8.4,
    },
  ];

  const handleChangeNav = (nav) => {
    setState({ navActive: nav });
  };
  return (
    <RecordDetailWrapper>
      <h2 className="record-title">
        {dataResult?.khamSucKhoeHopDong ? "Khám SK Hợp đồng" : "Ngoại trú"}
      </h2>
      {scrWidth>768&&<>
        <div className="record-header">
          {headerNav.map((item, index) => (
            <div
              onClick={() => handleChangeNav(index)}
              className={`record-header-item ${
                index == navActive ? "header-actived" : ""
              } d-flex align-item-center `}
            >
              <span
                className={`mr-1 ${index == navActive ? "actived-icon" : ""}`}
              >
                {" "}
                <item.icon />{" "}
              </span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <DividerProvide nav={headerNav} actived={navActive} />
        <div className="record-detail">
          {HOC(headerNav[navActive].component, {
            data,
            dataResult,
            dataDetail,
          })}
        </div>
      </>}

      {/* Responsive benh an */}
      {scrWidth<786&&headerNav.map((item, index) => (
        <ResponsiveRecord
          icon={<item.icon />}
          title={item.title}
          content={
            <item.component
              data={data}
              dataResult={dataResult}
              dataDetail={dataDetail}
            />
          }
        />
      ))}
    </RecordDetailWrapper>
  );
}

export default RecordDetail;
