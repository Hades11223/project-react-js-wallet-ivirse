import { Modal } from "antd";
import styled from "styled-components";

export const AdminlistWrapper = styled.div`
  .header {
    &__action {
      display: flex;
      justify-content: end;
      align-items: center;
      margin-bottom: 20px;
      @media screen and (max-width: 992px) {
        flex-direction: column;
        align-items: flex-start;
      }
      &__search {
        display: flex;
        align-items: center;
      }
      &__create {
        display: flex;
        gap: 10px;

        @media screen and (max-width: 992px) {
          margin-bottom: 15px;
        }
      }
      &__search {
        width: 50%;
        @media screen and (max-width: 992px) {
          width: 100%;
        }
      }
      &__consent {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        /* width: 100%; */
        /* margin-bottom: 20px; */
      }
    }

    &__filter {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      &__select {
        width: 400px;
      }
      &__search {
        width: 400px;
      }
    }
    &__reset {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      &__reset {
      }
      &__select {
        display: flex;
        justify-content: space-between;
        width: 500px;
      }
    }
  }
  .content {
    &__renounce__btn {
      width: 200px;
      margin-bottom: 20px;
    }
  }
  .filter-btn {
    display: none;
  }
  .opacity-group__wrapper {
    padding-bottom: 48px;
  }
  .content__renounce__btn.d-ipad {
    display: none;
  }
  /* Responsive */
  @media screen and (max-width: 992px) {
    .header__reset__select,
    .header__reset,
    .header__filter__select {
      display: none;
    }
    .header__filter__search {
      width: 90%;
    }
    .filter-btn {
      display: block;
      button {
        border: none;
        svg path {
          fill: white;
        }
      }
    }
    .content__renounce__btn {
      display: none;
    }
    .header__action {
      .d-ipad {
        display: block;
      }
    }
  }
`;

export const NewModal = styled(Modal)`
  .ant-modal-content {
    .ant-modal-close-x {
      .anticon {
        margin-top: 20px;

        margin-right: 5px;
        stroke: #6e6e6e;
        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .ant-modal-footer {
    display: flex;
    justify-content: end;
    .delete__btn {
      border-radius: 20px;
    }
    .submit__btn {
      width: auto;
    }
  }
`;
