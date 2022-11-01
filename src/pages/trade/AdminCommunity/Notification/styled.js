import { Popover } from "antd";
import styled from "styled-components";

export const NotificationWrapper = styled.div`
  .search {
    width: 370px;
  }
  .mark-as-read-icon {
    margin-left: -3px;
  }
  .mark-all-btn {
    .ant-btn {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      border: none;
      span {
        color: white;
        margin-left: 4px;
      }
    }
  }
  .select-filter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__select {
      width: 200px;
      .ant-select-selection-item {
        left: 75px;
      }
    }
    &__icon {
      svg {
        stroke-width: 0px;
        cursor: pointer;
        background: none;
        border-radius: 20px;
      }
      svg:hover {
        background: #503d66;
      }
    }
  }
  .ant-list-item {
    display: block;
  }
  .filter-btn {
    display: none;
  }
  .time-sort-btn {
    border: none;
    background-color: transparent;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }

  /* Responsive */
  @media screen and (max-width: 992px) {
    .select-filter,
    .filter-group {
      display: none;
    }
    .search {
      width: 90%;
    }
    .filter-btn {
      display: block;
      button {
        border: none;
      }
      svg path {
        fill: white !important;
      }
    }
  }
`;

export const BorderPopover = styled(Popover)`
  border-radius: 10px;
`;
