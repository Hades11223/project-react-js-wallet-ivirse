import styled from "styled-components";

export const DataHubMainWrapper = styled.div`
  padding: 0 5%;
  padding-top: 24px;
  #data-hub-jumbotron {
    .jumbotron-left {
      width: 55%;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      .jumbotron-text {
        font-size: 16px;
        line-height: 20px;
        text-align: justify;
        color: white;
        font-weight: 300;
      }
      .instruction-box {
        color: white;
        width: 80%;
        margin-top: 24px;
        padding: 20px 40px;
        height: 113px;
        border-radius: 20px;
        border: 2px solid #048556;
        /* background: #048556; */
        background: rgba(57, 112, 147, 0.8);
        @media screen and (max-width: 992px) {
          width: 100%;
        }
        .instruction-box__item {
          .instruction-box-item__value {
            font-size: 30px;
            line-height: 22px;
            font-weight: 700;
            margin-bottom: 12px;
          }
          .instruction-box-item__title {
            margin-bottom: 0px;
          }
        }
      }
    }
    .jumbotron-right {
      width: 45%;
      position: relative;
      @media screen and (max-width: 768px) {
        width: 70%;
        margin: auto;
      }
      .pill-background {
        width: 100%;
        position: absolute;
        z-index: -1;
        mix-blend-mode: lighten;
      }
      .pill {
        height: 382px;
        @media screen and (max-width: 768px) and (min-width: 576px) {
          height: 340px;
        }
        @media screen and (max-width: 577px) {
          height: 300px;
        }
      }
    }
  }
  .data-hub-how-it-work {
    margin-top: 32px;
    @media screen and (max-width: 576px) {
      .ant-col-xs-12 {
        max-width: 63%;
      }
    }
    h1 {
      margin-bottom: 24px;
      text-align: center;
      font-weight: 700;
      font-size: 30px;
      line-height: 55px;
      color: white;
    }
    .how-it-work-content {
      @media screen and (max-width: 768px) {
        margin: auto;
      }

      .how-it-work-item {
        border-radius: 20px;
        padding: 20px;
        height: 100%;
        .col-left {
          width: 50%;
          p {
            color: white;
            font-weight: 700;
            margin-bottom: 0px;
          }
          .content1 {
            font-size: 20px;
            line-height: 18px;
          }
          .content2 {
            font-size: 24px;
            line-height: 22px;
          }
        }
        .col-right {
          width: 50%;
        }
      }
    }
  }
  #data-hub-market-place {
    margin-top: 24px;
    .market-place-head {
      h1 {
        color: white;
        font-size: 30px;
        line-height: 55px;
        font-weight: 700;
        margin-right: 16px;
        margin-bottom: 0px;
      }
      .multi-button {
        max-width: -webkit-fill-available;
      }
      @media screen and (max-width: 576px) {
        flex-direction: column;
        margin-bottom: 15px;
        /* div {
          flex-wrap: wrap;
        } */
      }
    }
    .market-place-search {
      /* width: 80%;
      margin-left: 20%; */
    }
    .market-place-body {
      margin-top: 32px;
      .filter-sidebar__container {
        width: 20%;
        margin-bottom: 60px;
      }
      .group-items {
        width: 80%;
        @media screen and (max-width: 992px) {
          width: 100%;
          padding-left: 0;
        }
        padding-left: 20px;
        .result-number {
          color: white;
          span:first-child {
            font-size: 20px;
            line-height: 22px;
            font-weight: 700;
          }
          span:last-child {
            font-size: 14px;
            line-height: 18px;
            font-weight: 400;
          }
        }
        .group-items__body {
          margin-top: 24px;
        }
      }
    }
    .price-range-containter {
      margin-top: 8px;
      .price-range-wrapper {
        display: flex;
        align-items: center;
        input {
          width: 50%;
        }
      }
    }
  }
  .button-filter {
    overflow: scroll;
  }
  .button-filter::-webkit-scrollbar {
    display: none;
  }
  /* .ant-select-selection-item {
    color: red;
    display: none;
  } */
  .ant-pagination {
    position: relative;
  }
  .ant-pagination-options {
    position: absolute;
    left: -15px;
  }
`;

export const GroupItemWrapper = styled.div`
  padding-left: 20px;
  @media screen and (max-width: 992px) {
    padding: 0;
  }
  .search {
    margin-bottom: 20px;
    /* max-width: 200px; */
    display: flex;
    justify-content: end;
  }
  .category {
    max-width: 410px;
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
    overflow: scroll;
  }
  .category::-webkit-scrollbar {
    display: none;
  }
  .result-number {
    color: white;
    span:first-child {
      font-size: 20px;
      line-height: 22px;
      font-weight: 700;
    }
    span:last-child {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
    }
  }
  .group-items__body {
    margin-top: 24px;
  }
  .button-filter {
    overflow: scroll;
  }
  .button-filter::-webkit-scrollbar {
    display: none;
  }
`;
