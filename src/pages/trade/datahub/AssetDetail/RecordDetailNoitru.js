import { DanhSachDichVuIcon, ProfileDataIcon, ThongTinHanhChinhIcon, TomTatBenhAnIcon } from "@assets/svg";
import useCustomState from "@hook/useCustomState";
import { Divider } from "@pages/trade/vesting/components/styled";
import React from "react";
import { useSelector } from "react-redux";
import DividerProvide from "./components/DividerProvide";
import ProfileRecord from "./components/RecordPage/ProfileRecord";
import Administrative from "./components/RecordPageNoiTru/Administrative";
import MedicalRecordNoitru from "./components/RecordPageNoiTru/MedicalRecordNoitru";
import ServiceListNoitru from "./components/RecordPageNoiTru/ServiceListNoitru";
import ResponsiveRecord from "./components/ResponsiveRecord";
import { RecordNoiTruWrapperStyled } from "./styled";

function HOC(Component, props) {
  return <Component {...props} />;
}

function RecordDetailNoitru(props) {
  const { data, dataResult, dataDetail } = props;
  
  const [state, setState] = useCustomState({
    navActive: 0,
  });
  const { navActive } = state;
  const headerNav = [
    {
      component: ProfileRecord,
      title: "Profile",
      icon: ProfileDataIcon,
      length: 20,
    },
    {
      component: ServiceListNoitru,
      title: "Danh sách dịch vụ",
      icon : DanhSachDichVuIcon,
      length : 80/3
    },
    {
      component: Administrative,
      title: "Thông tin hành chính",
      icon : ThongTinHanhChinhIcon,
      length : 80/3
    },
    {
      component: MedicalRecordNoitru,
      title: "Tóm tắt bệnh án",
      icon : TomTatBenhAnIcon,
      length : 80/3
    },
  ];
  const handleChangeNav = (nav) => {
    setState({ navActive: nav });
  };
  const {scrWidth} = useSelector(state=>state.global)
  return (
    <RecordNoiTruWrapperStyled>
      
      <h2 className="record-title">Khám SK nội trú</h2>
      {scrWidth>768&&<>
      <div className="record-header">
        {headerNav.map((item, index) => (
          <div
          className={`record-header-item ${index==navActive ? "header-actived" : ""} d-flex align-item-center `}
            onClick={() => handleChangeNav(index)}
          >
             <span className={`mr-1 ${
              index == navActive ? "actived-icon" : ""
            }`}> <item.icon/> </span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <DividerProvide nav={headerNav} actived = {navActive} />
      <div className="record-detail">
        {HOC(headerNav[navActive].component, { data, dataResult, dataDetail })}
      </div></>}
      

      {/* Responsive benh an */}
      {scrWidth<768&&headerNav.map((item, index) => (
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
    </RecordNoiTruWrapperStyled>
  );
}

export default RecordDetailNoitru;
