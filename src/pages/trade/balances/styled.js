import styled from "styled-components";

export const StyledWrapper = styled.div`
  /* background-color: #f0f2f5; */
  width: 100%;
  padding: 0 5%;
  /* min-height: 100vh; */
  display: flex;

  .balances-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 36px;
    h1 {
      font-size: 1.5em;
      font-weight: 600;
    }
    /* .table-striped-rows tr:nth-child(2n) td {
      background-color: rgba(218, 129, 181, 0.05);
    } */
    #balances-window {
      h1 {
        color: white;
      }
      &-header {
        display: flex;
        margin-bottom: 24px;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 991px) {
          margin-bottom: 30px;
        }
        @media screen and (max-width: 991px) and (min-width: 768px) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media screen and (max-width: 576px) {
          display: block;
        }
        &-title {
          font-family: "Bai Jamjuree";
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          /* identical to box height, or 110% */

          background: linear-gradient(
            180deg,
            #ffffff 13.92%,
            #ea95bc 32.23%,
            #f9e3ed 59.9%,
            #ea95bc 84.72%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          margin: 0;
          @media screen and (max-width: 576px) {
            font-size: 30px;
            margin-bottom: 10px;
          }
        }
      }
    }
    /* .ant-table-layout-fixed {
      border-radius: 16px;
    } */
    /* .ant-table-container {
      border: 13px solid #7251b2;
      border-radius: 15px;
      .ant-table-thead {
        background-color: #7251b2;
      }
      .ant-table-thead .ant-table-cell {
        font-family: "Bai Jamjuree";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        background-color: #7251b2;
        text-align: center;
      }

      .ant-table-thead .ant-table-cell:not(:first-child) {
        border-radius: 12px 12px 0px 0px;
        position: absolute;
        height: 100px;
        top: -30px;
        padding-top: 40px;
        font-size: 24px;
      }

      .ant-table-thead .ant-table-cell:nth-child(2) {
        background: linear-gradient(180deg, #fb767c 0%, #fb9e81 100%);
        width: 20%; // width của cell này trong columns của bảng
        left: 25%; // width của first-child ( là cái name ) trong bảng
      }
      .ant-table-thead .ant-table-cell:nth-child(3) {
        background: linear-gradient(180deg, #a25efc 0%, #e981eb 93.23%);
        width: 20%; // width của cell này trong columns của bảng
        left: 45%; // 25% + 20% (left + width của phần tử trên)
      }
      .ant-table-thead .ant-table-cell:nth-child(4) {
        background: linear-gradient(180deg, #504cfe 0%, #78a3fb 100%);
        width: 35%; // width của cell này trong columns của bảng
        left: 65%; // 45% + 20%
      }
    } */
    .ant-table {
      background-color: transparent;
    }
    .ant-table table {
      border-collapse: collapse;
    }
    .ant-table-thead > tr > th {
      border: 0;
      color: white;
    }

    .search-table {
      width: 40%;
      @media screen and (max-width: 991px) {
        width: 100%;
      }
      .ant-input {
        border-top-left-radius: 100px;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        height: 38px;
      }
      .ant-input-group-addon {
        height: 38px;
        border-radius: 100px;
        button {
          border: none;
          height: 100%;
          border-top-right-radius: 100px !important;
          border-bottom-right-radius: 100px !important;
        }
        .ant-btn .anticon {
          background: radial-gradient(
            96.92% 1534.99% at 95.38% 91.84%,
            #915fcd 7.32%,
            #ae5297 100%
          );
          align-items: center;
          margin-right: 3px;
          height: 74%;
          width: 90%;
          justify-content: center;
          border-radius: 100%;
          color: white;
        }
      }
    }
    .ant-table-thead {
      /* position: relative;
      top:-11px; */
    }
    .ant-table-tbody {
      border: 1px solid white;
      color: white;
    }
    .ant-table-thead > tr > th {
      border-radius: 8px 8px 0px 0px;
      /* left: -1px; */
    }
    .ant-table-cell-row-hover {
      background-color: #48118a !important;
    }

    .ant-table-container table > thead > tr:first-child th:first-child {
      background: #a794f5;
      border-radius: 8px 8px 0px 0px;
    }
    .ant-table-thead .ant-table-cell:nth-child(2) {
      background: #927bfa;
      border-radius: 8px 8px 0px 0px;
    }
    .ant-table-thead .ant-table-cell:nth-child(3) {
      background: #866fea;
      border-radius: 8px 8px 0px 0px;
      /* left: -2px; */
    }
    .ant-table-thead .ant-table-cell:nth-child(4) {
      background: #7c64df;
      border-radius: 8px 8px 0px 0px;
      /* left: -3px; */
    }
    .ant-table-thead .ant-table-cell:nth-child(5) {
      background: #6e5ac3;
      border-radius: 8px 8px 0px 0px;
      /* left: -3px; */
    }
    .ant-table-container table > thead > tr:first-child th:last-child {
      border-radius: 8px 8px 0px 0px;
    }
    .ant-table-pagination > * {
      background: transparent;
      border: none;
    }
    .ant-pagination-item-active a {
      color: #000 !important;
    }
    .ant-pagination-disabled .ant-pagination-item-link,
    .ant-pagination-disabled:hover .ant-pagination-item-link {
      background: transparent;
      border: none;
      color: white;
    }
  }

  /* Responsive */
  @media (max-width: 992px) {
    #balances-window-header {
      flex-direction: column;
    }
    .balances-container {
      display: block;
      padding-bottom: 160px;
    }
  }
`;
