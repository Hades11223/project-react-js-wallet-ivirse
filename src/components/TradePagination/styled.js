import styled from "styled-components";

const TradePaginationWrapper = styled.div`
  text-align: right;
  .ant-pagination {
    position: relative;
    .ant-pagination-item {
      background-color: transparent;
      /* border-radius: 20%; */
      border: none;
      a {
        color: white;
      }
    }
    .ant-pagination-next,
    .ant-pagination-prev {
      background-color: transparent;
    }
    .ant-pagination-item-active {
      background-color: #fff;
      border-radius: 20%;
      a {
        color: #000;
        font-weight: 700;
      }
    }
    .ant-pagination-next,
    .ant-pagination-prev {
      .ant-pagination-item-link {
        border: none;
        background-color: transparent;
        border-radius: 20%;
        color: white;
      }
    }
    .ant-pagination-options {
      .ant-select-selector {
        background-color: transparent;
        color: white;
        border-radius: 20px;
      }
      .ant-select-arrow {
        color: white;
      }
    }
    .ant-pagination-item-ellipsis {
      color: white;
      opacity: 0.7;
    }
    .ant-pagination-options {
      top: 0;
      position: absolute;
      left: -15px;
    }
  }
`;

export default TradePaginationWrapper;
