import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import { Divider } from "@pages/trade/vesting/components/styled";
import moment from "moment";
import React from "react";
import { ServiceListNoitruWrapper } from "./styled";

function ServiceListNoitru({ data, dataResult, dataDetail }) {
  return (
    <ServiceListNoitruWrapper>
      <h2>{data?.hospitalName}</h2>
      <ContentLeftRight
        left={"TG khám:"}
        right={moment(data?.timeGoIn)?.format(
          "DD/MM/YYYY, h:mm:ss a"
        )}
        styleRight={{ fontWeight: 700 }}
      />
      <p>Dịch vụ đã thực hiện</p>
      <ul>
        {dataDetail?.dichVu?.map((item, index) => (
          <li key={index}>
            {item.trangThai !== 310 && (
              <ContentLeftRight
                left={item.tenDichVu}
                right={`${item.thanhTienDichVu.formatCurrency()}đ`}
              />
            )}
          </li>
        ))}
      </ul>
      <Divider 
        marginTop={10}
        marginBottom={20}
        opacity={0.1}
      />
      <ContentLeftRight
        left={"Tổng chi phí"}
        right={`${dataDetail?.tongTien?.formatCurrency()}đ`}
        styleRight={{fontWeight : 700}}
      />
      <ContentLeftRight
        left={"Chi phí sau ưu đãi"}
        right={`${dataDetail?.nbThanhToan?.formatCurrency()}đ`}
        styleRight={{fontWeight : 700}}
      />
    </ServiceListNoitruWrapper>
  );
}

export default ServiceListNoitru;
