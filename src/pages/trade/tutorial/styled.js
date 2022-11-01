import styled from "styled-components";

export const TutorialWrapper = styled.div`
  height: 100%;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  padding-top: 60px;
  /* overflow-y: hidden; */
  padding: 0px 5%;
  .text-wrapper {
    @media screen and (max-width: 576px) {
    }
    .margin-text {
      margin-bottom: 0 !important;
      text-transform: uppercase;
      @media screen and (max-width: 991px) and (min-width: 576px) {
        text-transform: uppercase;
      }
      @media screen and (max-width: 576px) {
        text-transform: capitalize;
        font-size: 50px;
      }
    }
    /* .margin-text-2 {
      @media screen and (max-width: 576px) {
        text-transform: capitalize;
        font-size: 30px;

      }
    } */
  }
  .content-wrapper {
    display: flex;
    justify-content: center;
    .animation {
      height: 250px;
      transform: scale(0.75);
    }
    &__animation {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      padding: 20px 20px;
      width: 700px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__text {
        text-align: center;
        color: white;
      }
      &__button {
        margin-top: 20px;
        width: 200px;
      }
    }
    @media screen and (max-width: 992px) {
      span {
        display: block;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .content-wrapper {
      &__animation {
        padding: 20px 1px;
        width: 600px;
        height: auto;
        &__button {
          margin-top: 20px;
          width: 150px;
        }
      }
    }
  }
  .item-wrapper {
    /* display: none; */
    font-family: "Bai Jamjuree";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    /* identical to box height, or 110% */

    /* White color */

    color: #ffffff;
    ul {
      padding-left: 0px;
      list-style: none;
      li:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  @media screen and (max-width: 576px) {
    .text-wrapper {
      div:first-child {
        font-size: 40px;
        line-height: 42px;
      }
      div:last-child {
        /* font-size: 24px; */
        line-height: 30px;
      }
    }
    .item-wrapper {
      margin-top: 24px;
      li {
        font-size: 16px;
      }
    }
  }

  @media screen and (max-width: 660px) {
    .content-wrapper {
      width: 100%;
      &__animation {
        padding: 20px 1px;
        width: calc(100%-30px);
        height: auto;
        &__button {
          margin-top: 20px;
          width: 150px;
        }
      }
    }
  }
`;
