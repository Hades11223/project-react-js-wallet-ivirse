import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import moment from "moment";
import React from "react";
import { AdministrativeWrapper } from "./styled";

function Administrative({ data, dataDetail, dataResult }) {
  return (
    <AdministrativeWrapper>
      {dataResult?.diaChi&&<ContentLeftRight
        left={"Địa chỉ cư trú"}
        right={dataResult?.diaChi}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {dataResult?.soCanCuoc&&<ContentLeftRight
        left={"Số CMT/ Số CCCD/ Số HC"}
        right={dataResult?.soCanCuoc}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {dataDetail?.khoa&&<ContentLeftRight
        left={"Khoa"}
        right={dataDetail?.khoa}
        styleRight={{ fontWeight: 700 }}
      />}
      {/* <div className="adminis-space"></div> */}
      {(dataResult?.ngayRaVien || data?.updatedDate)&&<ContentLeftRight
        left={"Ngày ra viện"}
        right={moment(dataResult?.ngayRaVien || data?.updatedDate)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />}
      {dataResult?.ngayVaoVien&&<ContentLeftRight
        left={"Ngày vào viện"}
        right={moment(dataResult?.ngayVaoVien)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />}
     {dataResult?.maBenhAn&& <ContentLeftRight
        left={"Mã bệnh án"}
        right={dataResult?.maBenhAn}
        styleRight={{ fontWeight: 700 }}
      />}
      {dataResult?.soTheBaoHiem&&<ContentLeftRight
        left={"Số thẻ bảo hiểm y tế"}
        right={dataResult?.soTheBaoHiem}
        styleRight={{ fontWeight: 700 }}
      />}
    </AdministrativeWrapper>
  );
}

export default Administrative;
