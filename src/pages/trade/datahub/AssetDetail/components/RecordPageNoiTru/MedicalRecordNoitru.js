import React from "react";
import { MedicalRecordNoitruWrapper } from "./styled";

function MedicalRecordNoitru({ data, dataResult, dataDetail }) {
  const getTrangThai = (state) => {
    switch (state) {
      case "PaidOut":
        return "Đã thanh toán viện phí";
      case "New":
        return "Mới";
      case "TransferDepartment":
        return "Chuyển khoa";
      case "InHospital":
        return "Trong viện";
      case "AppointmentIsPaid":
        return "Hẹn điều trị và đã thanh toán";
      case "OutHospital":
        return "Đã ra viện và chưa thanh toán";
      case "OutpatientTreatment":
        return "Điều trị ngoại trú";
      case "AppointmentNotPaid":
        return "Hẹn điều trị và chưa thanh toán";
    }
  };
  return (
    <MedicalRecordNoitruWrapper>
      {dataResult?.trangThaiNb&&<>
      <b>Trạng thái người bệnh:</b>
      <p>{getTrangThai(dataResult?.trangThaiNb)}</p>
      </>}
      <b>Quá trình bệnh lý và diễn biến lâm sàng:</b>
      <p>{dataResult?.quaTrinhBenhLyDbCls}</p>
      <b>Tóm tắt khám lâm sàng và kết quả cận lâm sàng có giá trị chẩn đoán:</b>
      <p>{dataResult?.tomTatKqCls}</p>
      <b>Chẩn đoán khi ra viện:</b>
      <p>{dataResult?.chanDoanRaVien}</p>

      {/* data khac Null thi render */}
      

      {dataResult?.chanDoanVaoVien && (
        <>
          <b>Chẩn đoán vào viện:</b>
          <p>{dataResult?.chanDoanVaoVien}</p>
        </>
      )}
      {dataResult?.chanDoanRaVienKhac && (
        <>
          <b>Chẩn đoán ra viện khác:</b>
          <p>{dataResult?.chanDoanRaVienKhac}</p>
        </>
      )}

      {dataResult?.chanDoanRaVienChiTiet && (
        <>
          <b>Chẩn đoán ra viện chi tiết:</b>
          <p>{dataResult?.chanDoanRaVienChiTiet}</p>
        </>
      )}

      {dataResult?.loiDanBacSi && (
        <>
          <b>Lời dặn bác sĩ:</b>
          <p>{dataResult?.loiDanBacSi}</p>
        </>
      )}

      {dataResult?.phuongPhapDieuTri && (
        <>
          <b>Phương pháp điều trị:</b>
          <p>{dataResult?.phuongPhapDieuTri}</p>
        </>
      )}
      {dataResult?.quaTrinhBenhLyDbCls && (
        <>
          <b>Quá trình bệnh lý diễn biến cận lâm sàng:</b>
          <p>{dataResult?.quaTrinhBenhLyDbCls}</p>
        </>
      )}
      {dataResult?.tomTatKqCls && (
        <>
          <b>Tóm tắt kết quả cận lâm sàng: </b>
          <p>{dataResult?.tomTatKqCls}</p>
        </>
      )}
      {dataResult?.huongDieuTri && (
        <>
          <b>Hướng điều trị:</b>
          <p>{dataResult?.huongDieuTri}</p>
        </>
      )}
      {dataResult?.ketQuaDieuTri && (
        <>
          <b>Kết quả điều trị:</b>
          <p>{dataResult?.ketQuaDieuTri}</p>
        </>
      )}
      {dataResult?.hinhThucRaVien && (
        <>
          <b>Hình thức ra viện:</b>
          <p>{dataResult?.hinhThucRaVien}</p>
        </>
      )}
    </MedicalRecordNoitruWrapper>
  );
}

export default MedicalRecordNoitru;
