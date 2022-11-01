import BaseResponsive from "@components/base/BaseResponsive";
import TradeButton from "@components/TradeButton";
import ContentLeftRight from "@pages/trade/components/ContentLeftRight";
import MultipleButtonSelect from "@pages/trade/components/MultipleButtonSelect";
import { TradeTable } from "@pages/trade/components/styled";
import React, { useState } from "react";
import { useEffect } from "react";
import { TestResultWrapperStyled } from "./styled";

function TestResult({ data, dataResult, dataDetail }) {
  
  const dataHoaSinh = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === "Hóa sinh"
  );
  const dataHuyetHoc = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === "Huyết học"
  );
  const dataViSinh = dataResult?.xn?.filter(
    (item, index) =>
      item.nhomDichVuCap2 === "Vi sinh - Ký sinh trùng" ||
      item.nhomDichVuCap2 === "Vi sinh"
  );
  const dataKhac = dataResult?.xn?.filter(
    (item, index) => item.nhomDichVuCap2 === "Xét nghiệm khác"
  );

  const dataHuyetHocMerge = dataHuyetHoc?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataHoaSinhMerge = dataHoaSinh?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataViSinhMerge = dataViSinh?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const dataKhacMerge = dataKhac?.reduce((total, item, index) => {
    return [...total, item, ...item?.chiSoCon];
  }, []);
  const [state, _setState] = useState({
    dataActive: 0,
    page : 0,
    size : 10,
  });
  console.log(state,"state sap xong")
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      render: (data, dataObject, index) => {
        return  index + 1;
      },
      width: "5%",
    },
    ,

    {
      title: "Tên xét nghiệm",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (data, dataObject, index) => {
        return (
          <div className={`${data ? "font-title" : ""}`}>
            {/* {(<span className="font-bold">{data}</span>) || (
              <span>{dataObject?.tenChiSo}</span>
            )} */}
            {data || dataObject?.tenChiSo}
          </div>
        );
      },
      width: "50%",
    },
    {
      title: "Kết quả",
      dataIndex: "ketQua",
      key: "ketQua",
      width: "15%",
      render: (data, dataObject, index) => {
        return (
          <>
            <div>{data} </div>
          </>
        );
      },
    },
    {
      title: "Đơn vị",
      dataIndex: "donVi",
      key: "donVi",
      width: "15%",
      render: (data, dataObject, index) => {
        return (
          <div>
            <span>{data}</span>
          </div>
        );
      },
    },
    {
      title: "Giá trị tham chiếu",
      dataIndex: "binhThuong",
      key: "binhThuong",
      width: "25%",
      render: (data, dataObject, index) => {
        return (
          <div>
            <span>{data || dataObject.chiSoCao}</span>
          </div>
        );
      },
    },
  ];
  const testObject = [
    {
      title: "Hóa sinh",
      data: dataHoaSinhMerge,
    },
    {
      title: "Huyết học",
      data: dataHuyetHocMerge,
    },
    {
      title: "Vi sinh - Ký sinh trùng",
      data: dataViSinhMerge,
    },
    {
      title: "Xét nghiệm khác",
      data: dataKhacMerge,
    },
  ];

  useEffect(() => {}, []);
  return (
    <TestResultWrapperStyled>
      <div className="d-flex mb-4 overflow-scroll-phong">
        <MultipleButtonSelect
          options={[
            {
              text: "Hóa sinh",
            },
            {
              text: "Huyết học",
            },
            {
              text: "Vi sinh - Ký sinh trùng",
            },
            {
              text: "Xét nghiệm khác",
            },
          ]}
          onChange={(item, index) => {
            setState({
              dataActive: index,
            });
          }}
        />
        {/* {testObject?.map((item, index) => (
          <TradeButton
            content={item?.title}
            colorText={"#ffffff"}
            onClick={() => {
              setState({
                dataActive : index
              })
            }}
          />
        ))} */}
      </div>
      {/* <TradeTable
        style={{borderBottom : "solid #fff 2px"}}
        columns={columns} 
        dataSource={testObject[state.dataActive]?.data}
        scroll={{ y: 500 }}
        showSizeChanger={false}
        pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
      /> */}
      {console.log(testObject[state.dataActive]?.data,"testObject[state.dataActive]?.data")}
      <BaseResponsive
        columns={columns}
        dataSource={testObject[state.dataActive]?.data}
        clientSearch={true}
        
      />
      {/* <TradeTable
        columns={columns}
        dataSource={dataHuyetHocMerge}
        scroll={{ y: 500 }}
        showSizeChanger={false}
        defaultPageSize={1000}
        pagination={{ defaultPageSize: 1000, hideOnSinglePage: true }}
      /> */}

      {/* Hóa sinh :  */}
      {/* <div className="test-title">
        <h2>Hóa sinh</h2>
        <h2>KQ</h2>
      </div> */}

      {/* {dataResult?.xn
        ?.filter((item, index) => item.nhomDichVuCap2 === "Hóa sinh")
        .map((item, index) => (
          <div key={index}>
            <ContentLeftRight
              left={item.tenDichVu}
              right={item.ketQua}
              styleRight={{ textDecorationLine: "underline" }}
            />
            <ul style={{ listStyle: "initial" }}>
              {item?.chiSoCon?.map((itemChild) => (
                <li>
                  <ContentLeftRight
                    left={itemChild?.tenChiSo}
                    right={itemChild?.ketQua}
                    styleRight={{ textDecorationLine: "underline" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))} */}

      {/* Huyết học */}
      {/* <div className="test-title">
        <h2>Huyết học</h2>
        <h2>KQ</h2>
      </div> */}

      {/* {dataResult?.xn
        ?.filter((item, index) => item.nhomDichVuCap2 === "Huyết học")
        .map((item, index) => (
          <div key={index}>
            <ContentLeftRight
              left={item.tenDichVu}
              right={item.ketQua}
              styleRight={{ textDecorationLine: "underline" }}
            />
            <ul style={{ listStyle: "initial" }}>
              {item?.chiSoCon?.map((itemChild) => (
                <li>
                  <ContentLeftRight
                    left={itemChild?.tenChiSo}
                    right={itemChild?.ketQua}
                    styleRight={{ textDecorationLine: "underline" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))} */}

      {/* Vi sinh */}
      {/* <div className="test-title">
        <h2>Vi sinh</h2>
        <h2>KQ</h2>
      </div>
      {dataResult?.xn
        ?.filter((item, index) => item.nhomDichVuCap2 === "Vi sinh")
        .map((item, index) => (
          <div key={index}>
            <ContentLeftRight
              left={item.tenDichVu}
              right={item.ketQua}
              styleRight={{ textDecorationLine: "underline" }}
            />
            <ul style={{ listStyle: "initial" }}>
              {item?.chiSoCon?.map((itemChild) => (
                <li>
                  <ContentLeftRight
                    left={itemChild?.tenChiSo}
                    right={itemChild?.ketQua}
                    styleRight={{ textDecorationLine: "underline" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))} */}

      {/* Xét nghiệm khác */}
      {/* <div className="test-title">
        <h2>Xét nghiệm khác</h2>
        <h2>KQ</h2>
      </div>
      {dataResult?.xn
        ?.filter((item, index) => item.nhomDichVuCap2 === "Xét nghiệm khác")
        .map((item, index) => (
          <ContentLeftRight
            left={item.tenDichVu}
            right={item.ketQua}
            styleRight={{ textDecorationLine: "underline" }}
          />
        ))} */}
    </TestResultWrapperStyled>
  );
}

export default TestResult;
