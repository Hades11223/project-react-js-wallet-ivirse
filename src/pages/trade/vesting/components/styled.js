import styled from "styled-components";

export const VerifyContainerWrapper = styled.div`
 width: 420px;
  height: 420px;
  padding: 10px;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  align-items: center;
  /* position: absolute; */

  .logo {
    margin-top: 70px;
  }
  .linear-button {
    padding: 4px 26px 6px;
    width: 256px;
    height: 40px;
    background: radial-gradient(
      96.92% 1534.99% at 95.38% 91.84%,
      #915fcd 7.32%,
      #ae5297 100%
    );
    border-radius: 20px;
    color: white;
  }

  .loading-container {
    min-height: 150px;
    position: relative;
    .loading-content {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .text-container {
    .welcome-text {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      color: #0c0c0c;
    }
    .verify-text {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      color: #0c0c0c;
      margin-top: 19px;
    }
  }

  @media screen and (max-width: 490px) {
    width: 300px;
    height: 300px;
    .logo {
      margin-top: 20px;
      transform: scale(0.7);
    }
    .text-container {
      .welcome-text {
        font-size: 20px;
        line-height: 30px;
      }
      .verify-text {
        font-size: 17px;
      }
    }
  }
`;

export const ClaimWrapper = styled.div`
  width: 100%;
  margin-bottom: 48px;
  /* background: linear-gradient(112.27deg, #5e2c9a 8.7%, #220643 73.28%); */
  /*  */

  .parent-wrapper {
    .vesting-header {
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 700;
      font-size: 50px;
      line-height: 55px;
      /* identical to box height, or 110% */

      background: linear-gradient(
        180deg,
        #ffffff 13.92%,
        #ea95bc 32.23%,
        #f9e3ed 64.78%,
        #ea95bc 84.72%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .ant-col {
      height: 450px;
    }
    .filter-group {
      min-width: 250px;
      .custom-select-wrapper {
        position: relative;
        padding: 1px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid white;
        border-radius: 20px;
        background-color: transparent;
        width: 100%;
        .select-prefix {
          position: absolute;
          left: 8px;
          display: flex;
          align-items: center;
          color: white;
          svg {
            circle,
            path {
              stroke: white;
            }
          }
          .custom-css-icon {
            width: 20px;
            height: 20px;
            circle,
            path {
              stroke-width: 0.01;
            }
          }
          span {
            margin-left: 4px;
          }
        }
        .ant-select-selector {
          background-color: transparent;
          border: none;
          .ant-select-selection-item {
            color: white;
            position: absolute;
            left: 72px;
          }
        }
        .ant-select-arrow {
          color: white;
        }
      }
    }
    .reset-btn-wrapper {
      .ant-btn {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        border: none;
        padding: 4px 7px;
        height: 100%;
        span {
          color: white;
          margin-left: 4px;
        }
      }
    }
    .ant-divider {
      border-top: 1px solid #fff;
      margin: 45px 0;
    }
    .pie-chart-group-container {
      @media screen and (max-width: 991px) and (min-width: 768px) {
        display: block;
      }
      .group-legend {
        margin-top: 40px;

        width: 20%;
        height: 322px;
        border-radius: 20px;
        background-color: rgba(43, 43, 43, 0.2);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 32px;
        justify-content: center;
        @media screen and (max-width: 991px) and (min-width: 768px) {
          display: flex;
          flex-direction: row;
          background-color: transparent;
          width: 100%;
          padding-top: 30px;
          height: 100%;
        }
        .legend-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          span {
            margin-left: 12px;
            color: white;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .chart-section {
        display: flex;
        justify-content: space-around;
        width: 100%;

        @media screen and (max-width: 991px) and (min-width: 768px) {
          width: 100%;
        }
      }
    }
    .line-chart-section-openning {
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 700;
      font-size: 50px;
      line-height: 55px;
      /* identical to box height, or 110% */

      background: linear-gradient(
        180deg,
        #ffffff 13.92%,
        #ea95bc 32.23%,
        #f9e3ed 64.78%,
        #ea95bc 84.72%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .line-chart-button-switch {
      padding: 30px 0;
    }
    .line-and-area-chart-container {
      padding: 24px;
      padding-top: 32px;
      border-radius: 20px;
      background-color: rgba(43, 43, 43, 0.2);
      margin-bottom: 60px;
      .month-filter {
        @media screen and (max-width: 991px) and (min-width: 768px) {
          margin: auto;
        }
        .month-filter__item {
          background-color: transparent;
          border: none;
          color: white;
          padding: 4px 24px;
          &:hover {
            font-weight: 700;
          }
        }
      }
      .custom-chart-legend {
        margin-top: 24px;
        padding-left: 80px;
        .custom-chart-legend__item {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 50px;
          span {
            margin-left: 8px;
            color: white;
            font-weight: 700;
            font-size: 16px;
          }
        }
      }
    }
    .active-btn {
      .ant-btn {
        border: none;
        background-color: white;
        svg {
          path {
            stroke: #9b5fcc;
          }
        }
        span {
          font-weight: 700;
          color: #9b5fcc;
        }
      }
    }
  }
  .claim-all-block {
    text-transform: uppercase;
  }
  @media screen and (min-width: 577px) and (max-width: 767px) {
    .pie-chart-group-container {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      flex-direction: column;
      .group-legend {
        width: 100% !important;
        background-color: transparent !important;
        justify-content: flex-start !important;
        padding: 0px !important;
        padding-top: 16px !important;
        height: 200px !important;
      }
      .chart-section {
        display: flex;
        justify-content: space-around;
        width: 100% !important;
        .main-chart {
          flex-direction: column-reverse;
          h3 {
            padding-left: 16px;
            width: 100%;
            text-align: left !important;
          }
          .pie-chart {
            width: 535px !important;
          }
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    .parent-wrapper {
      .vesting-header {
        font-size: 30px;
        line-height: 32px;
      }
      .vesting-header ~ div {
        .filter-group {
          min-width: 200px;
        }
      }
      .claim-all-block {
        h1 {
          font-size: 16px;
          text-transform: capitalize;
          font-weight: 400;
        }
        .amount-claim-all {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .amount-claim-all ~ div {
          button {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }
    .pie-chart-group-container {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      flex-direction: column;
      .group-legend {
        width: 100% !important;
        background-color: transparent !important;
        justify-content: flex-start !important;
        padding: 0px !important;
        padding-top: 16px !important;
        height: 200px !important;
      }
      .chart-section {
        display: flex;
        justify-content: space-around;
        width: 100% !important;
        .main-chart {
          flex-direction: column-reverse;
          h3 {
            padding-left: 16px;
            width: 100%;
            text-align: left !important;
          }
          .pie-chart {
            width: 486px !important;
          }
        }
      }
    }
    .line-and-area-chart-container {
      padding: 0px !important;
    }
    .line-chart-section-openning {
      font-size: 24px !important;
    }
    .custom-chart-legend {
      flex-direction: column;
      padding-left: 0px !important;
    }
    .custom-chart-legend__item {
      justify-content: unset !important;
    }
  }
`;
export const PieWrapper = styled.div`
  height: 100%;
  /* display: flex; */
  /* .recharts-pie{
    width: 100%;
    height: 100%;
  } */
  .main-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 991px) and (min-width: 768px) {
      /* flex-direction: row-reverse;
      align-items: flex-start; */
      justify-content: space-between;
    }
    @media screen and (min-width: 992px) {
      h3.chart-title {
        margin-top: -80px;
        padding-left: 40px;
      }
    }
    @media screen and (min-width: 576px) and (max-width: 768px) {
      h3.chart-title {
        margin-top: -80px;
        padding-left: 40px;
      }
    }
    @media screen and (max-width: 576px) and (min-width: 374px) {
      padding-left: 50px;
      h3.chart-title {
        margin-left: -60px;
      }
    }
  }
  .legend-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .flex {
      display: flex;
      padding-bottom: 10px;
    }
  }
  /* .recharts-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
  } */
`;

export const SwitchButtonStyled = styled.div`
  display: ${(props) => props.test};
  .switch-chart {
    justify-content: center;
  }
`;

export const LegendPoint = styled.div`
  width: 18px;
  height: 18px;
  background: ${(props) => props.background};
  border-radius: 50%;
  border: 1px solid white;
`;

export const Divider = styled.div`
  border: 1px solid #ffffff;
  background-color: #ffffff;
  opacity: ${props=>props.opacity};
  width: 100%;
  margin-bottom:  ${props=>props.marginBottom}px;
  margin-top: ${(props)=>props.marginTop}px;
  display: ${(props) => props.display};
  width: ${(props) => props.width}%;
  height: 1px;
`;

export const LineItem = styled.div`
  border: ${(props) => `2px solid ${props.color}`};
  background-color: ${(props) => props.color};
  width: 51px;
  height: 0px;
  border-radius: 5px;
`;

export const OpacityBoxGroupWrapper = styled.div`
  .opacity-box {
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
  .claim-all-block {
    padding: 16px;
    text-align: center;
    color: white;
    h1 {
      font-size: 20px;
      color: white;
      margin-bottom: 0px;
    }
    .amount-claim-all {
      font-size: 50px;
    }
  }
  .data-block {
    .vesting-data {
      padding: 16px;
      margin-bottom: 12px;
      .data-item {
        display: flex;
        justify-content: space-between;
      }
      .data-item-gold {
        color: #bebd4b;
        font-style: italic;
      }
    }
    p,
    span {
      color: white;
      font-size: 16px;
    }
    .data-right {
      text-align: right;
      .data-item {
        justify-content: flex-end;
      }
    }
    .ant-btn {
      margin-right: 0px;
    }
  }
`;

export const ChartEllipseWrapper = styled.div`
  .chart-ellipse-icon {
    circle {
      fill: ${(props) => props?.fill};
    }
  }
  .chart-tooltip-item__value,
  .chart-tooltip-item__name {
    color: ${(props) => props?.fill};
    margin-left: 8px;
  }
`;

export const ChartToolTipWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 16px 8px;
  border-radius: 5px;
  .label {
    font-weight: 700;
    color: white;
  }
`;

export const P70 = styled.span`
  width: 50%;
  text-align: end;
`;
