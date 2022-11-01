import { ConsoleSqlOutlined } from "@ant-design/icons";
import TradeButton from "@components/TradeButton";
import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { Divider } from "@pages/trade/vesting/components/styled";
import React from "react";
import { useState } from "react";
import { MedicResultWrapperStyled } from "./styled";
import { Row, Col } from "antd";

function MedicResult({ data, dataResult, dataDetail }) {
  const [active, setActive] = useState(0);
  console.log(active, "active");
  const handleChangeHeader = (index) => {
    setActive(index);
  };
  const arrKham = dataResult?.kham?.map((item) => ({
    text: item?.tenDichVu,
  }));
  console.log(dataResult, "helo1233333333333333333333");
  return (
    <MedicResultWrapperStyled>
      <div className="medic-header">
        <div className={"overflow-scroll-phong"}>
          <MultipleButtonSelect
            options={arrKham}
            onChange={(item, index) => {
              handleChangeHeader(index);
            }}
          />
        </div>
        {/* {dataResult?.kham.map((item, index) => (
          <TradeButton
            content={item.tenDichVu}
            colorText={"#ffffff"}
            onClick={() => handleChangeHeader(index)}
          />
        ))} */}
      </div>
      <h2>{dataResult?.kham[active]?.tenDichVu}</h2>
      {/* <ContentLeftRight
        left="Bác sĩ"
        right={dataResult?.kham[active]?.bacSi}
        styleRight={{ fontWeight: 700 }}
      /> */}
      {active ? (
        <>
          <ContentLeftRight
            left={dataResult?.kskHopDong[41]?.tenTruong}
            right={dataResult?.kskHopDong[41]?.giaTri}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left="Phòng khám:"
            right={dataResult?.kham[active]?.phong}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left="Khoa:"
            right={dataResult?.kham[active]?.khoa}
            styleRight={{ fontWeight: 700 }}
          />
        </>
      ) : (
        <>
          <ContentLeftRight
            left={dataResult?.kskHopDong[37]?.tenTruong}
            right={dataResult?.kskHopDong[37]?.giaTri}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left="Phòng khám:"
            right={dataResult?.kham[active]?.phong}
            styleRight={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left="Khoa:"
            right={dataResult?.kham[active]?.khoa}
            styleRight={{ fontWeight: 700 }}
          />
        </>
      )}

      {dataResult?.kham[active]?.hotlineKhoa && (
        <ContentLeftRight
          left="Số điện thoại khoa:"
          right={dataResult?.kham[active]?.hotlineKhoa}
          styleRight={{ fontWeight: 700 }}
        />
      )}
      {dataResult?.thongTinKham && (
        <div className="medic-title">
          <h2>Thông tin khám</h2>
          <Divider width={30} />
        </div>
      )}

      {dataResult?.tienSu && (
        <div className="medic-title">
          <h2>Tiền sử</h2>
          <Divider width={30} />
        </div>
      )}
      {/* <ContentLeftRight
        left="Gia đình"
        right=""
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Sinh đôi"
        right="Có"
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Cao huyết áp"
        right="Có"
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Phụ khoa"
        right=""
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Tuổi có kinh lần đầu"
        right="15"
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Nội ngoại khoa"
        right=""
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Mổ ruột thừa"
        right="Có"
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Phẫu thuật ổ bụng"
        right="Có"
        styleRight={{ fontWeight: 700 }}
      /> */}
      {dataResult?.chiTietKham && (
        <div className="medic-title">
          <h2>Chi tiết khám</h2>
          <Divider width={30} />
        </div>
      )}
      {/* <ContentLeftRight
        left="Thể tích tử cung"
        right="25"
        styleRight={{ fontWeight: 700 }}
      />
      <ContentLeftRight
        left="Mật độ tử cung"
        right="25"
        styleRight={{ fontWeight: 700 }}
      /> */}
      <div className="medic-title">
        <h2>Kết luận</h2>
        <Divider width={30} />
      </div>
      {/* {active === 0 && dataResult?.kskHopDong[21] && (
        <div>
          <div className="w-700">{dataResult?.kskHopDong[21]?.tenTruong}</div>
          <div>- {dataResult?.kskHopDong[21]?.giaTri}</div>
        </div>
      )} */}
      <Row gutter={[24, 24]}>
        {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].map(
          (item, index) => {
            return (
              <>
                {active === 0 && dataResult?.kskHopDong[item]?.giaTri && (
                  <Col xl={3} lg={8} sm={8} key={index}>
                    <div className="w-700">
                      {dataResult?.kskHopDong[item]?.tenTruong}
                    </div>
                    <div>{dataResult?.kskHopDong[item]?.giaTri}</div>
                  </Col>
                )}
              </>
            );
          }
        )}
      </Row>
      {Array.from([39, 40], (el, idx) => (
        <>
          {active === 1 && dataResult?.kskHopDong[el]?.giaTri && (
            <div>
              <div className="w-700">
                {dataResult?.kskHopDong[el]?.tenTruong}
              </div>
              <div>- {dataResult?.kskHopDong[el]?.giaTri}</div>
            </div>
          )}
        </>
      ))}

      {dataResult?.kham[active]?.cdBanDau && (
        <>
          <ContentLeftRight
            left="Chẩn đoán sơ bộ"
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={dataResult?.kham[active]?.cdBanDau
              ?.split("/")
              .map((item, index) => (
                <div>- {item}</div>
              ))}
          />
        </>
      )}
      {/* {dataResult?.kham[active]?.cdChiTiet && (
        <>
          <ContentLeftRight
            left="Chẩn đoán chi tiết"
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={dataResult?.kham[active]?.cdChiTiet
              ?.split(";")
              ?.map((item, index) => (
                <div>- {item}</div>
              ))}
          />
        </>
      )} */}
      {dataResult?.kham[active]?.cdChinh && (
        <>
          <ContentLeftRight
            left="Chẩn đoán bệnh"
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={dataResult?.kham[active]?.cdChinh
              ?.formatBenhAn()
              .map((itemm, index) => (
                <div key={index}>- {itemm}</div>
              ))}
          />
        </>
      )}
      {dataResult?.kham[active]?.cdKhac && (
        <>
          <ContentLeftRight
            left="Chẩn đoán khác"
            right=""
            styleLeft={{ fontWeight: 700 }}
            marginBottom={0}
          />
          <ContentLeftRight
            left={dataResult?.kham[active]?.cdKhac
              ?.split(";")
              ?.map((item, index) => (
                <div>{item}</div>
              ))}
          />
        </>
      )}
      {dataResult?.kham[active]?.loiDan && (
        <div>
          <ContentLeftRight
            left="Lời dặn"
            right=""
            styleLeft={{ fontWeight: 700 }}
          />
          <ContentLeftRight
            left={dataResult?.kham[active]?.loiDan
              ?.formatBenhAn()
              .map((itemm, index) => (
                <div key={index}>{itemm}</div>
              ))}
          />
        </div>
      )}
    </MedicResultWrapperStyled>
  );
}

export default MedicResult;
