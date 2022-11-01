import styled from "styled-components";

export const TokenWrapper = styled.div`
  width: 100%;
  .flex-container {
    height: 400px;
    display: flex;
  }
  .title-table {
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 55px;
    color: white;
    padding-top: 40px;
  }
`;

// export const PieWrapper = styled.div`
//   .main-chart {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
//   .title-container {
//     margin-top: 500px;
//     padding-top: 500px;
//     background: linear-gradient(
//       90deg,
//       #6e5ac3 2.6%,
//       rgba(110, 90, 195, 0) 84.37%
//     );
//   }
//   .chart-title {
//     text-align: center;
//     color: white;
//     font-size: 24px;
//     padding: 12px 20px 0px 20px;
//     font-family: "Bai Jamjuree";
//     font-style: normal;
//     font-weight: 400;
//     /* font-size: 20px; */
//   }
//   .total {
//     text-align: center;
//     color: white;
//     font-family: "Bai Jamjuree";
//     font-style: normal;
//     font-weight: 700;
//     font-size: 24px;
//     padding-top: 10px;
//   }
// `;

export const AmPieWrapper = styled.div`
  .main-chart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .chart-div {
    height: 300px;
    width: 100%;
  }
  .title-container {
    margin-top: 20px;
    background: linear-gradient(
      90deg,
      #6e5ac3 2.6%,
      rgba(110, 90, 195, 0) 84.37%
    );
  }
  .chart-title {
    text-align: center;
    color: white;
    font-size: 24px;
    padding: 12px 20px 0px 20px;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 400;
    /* font-size: 20px; */
  }
  .total {
    text-align: center;
    color: white;
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    padding-top: 10px;
  }
  @media screen and (max-width: 1325px) {
    .chart-title {
      font-size: 22px;
    }
    .total {
      font-size: 22px;
    }
  }
`;
