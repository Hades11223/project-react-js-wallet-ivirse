import styled from "styled-components";

export const AiDemoPageWrapper = styled.div`
  max-width: 1400px;
  padding: 0 5%;
  margin-left: auto;
  margin-right: auto;
  height: calc(100vh - var(--trade-header-height) - 180px);
  #prediction-wrapper {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    width: 100%;
    padding: 32px;
    p.des-text {
      font-family: "Bai Jamjuree";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      margin-bottom: 28px;
    }
    .upload-field {
      height: 100%;
      .aside-progress-bar__item .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border: 1px solid white;
        border-radius: 50%;
        right: -30px;
        top: 32px;
        position: absolute;
        background-color: transparent;
        &.active {
          background-color: white;
        }
      }
      .aside-progress-bar__item {
        margin-top: 36px;
        padding-top: 12px;
        padding-bottom: 12px;
        position: relative;
        .item-text-field {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 70%;
        }
        .item-text-field h3 {
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          color: #ffffff;
        }
        .item-text-field p {
          font-family: "Bai Jamjuree";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          text-align: justify;
          color: #f5f5f5;
        }
        .progress-icon {
          margin-left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 53px;
          height: 53px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          &.active {
            background-color: white;
            svg path {
              fill: #61ca96;
            }
          }
          svg {
            width: 28px;
            height: 28px;
            path {
              fill: gray;
            }
          }
        }
      }
      .aside-progress-bar {
        width: 35%;
        border-right: 2px solid rgba(245, 245, 245, 0.3);
        padding-right: 24px;
      }
      .progressing-animation {
        width: 100%;
        height: 100%;
      }
      .upload-field__wrapper {
        width: 65%;
        padding: 24px;
        padding-top: 0px;
        padding-right: 0px;
        .ant-btn {
          padding: 24px 32px;
        }
        .upload-field__body {
          border-radius: 20px;
          border: 1px solid #915fcd;
          border-style: dashed;
          padding: 24px;
          margin-bottom: 24px;
          min-height: 250px;
          .left-side {
            width: 60%;

            .ant-upload {
              background-color: transparent;
            }
            .ant-upload-list-item {
              div,
              span {
                color: white;
              }
              &:hover {
                background-color: red;
              }
            }

            .upload-btn {
              background: none;
              border: none;
              outline: none;
              padding: 48px;
              &:hover {
                cursor: pointer;
              }
              svg {
                width: 100px;
                height: 100px;
                path {
                  fill: white;
                }
              }
            }
            .preview-img {
              width: 100%;
              height: 100%;
              max-width: 250px;
              max-height: 250px;
            }
          }
          .right-side {
            width: 40%;
            margin-left: 12px;
            & > p {
              padding: 12px;
              font-weight: 700;
              font-size: 16px;
              line-height: 22px;
              color: #ffffff;
              border: 1px solid #b0b0b0;
              border-radius: 10px;
              background: rgba(217, 217, 217, 0.2);
            }
            .upload-description {
              list-style-type: circle;
              font-weight: 500;
              font-size: 14px;
              line-height: 18px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }

  /* Responsive */

  @media screen and (min-width: 1400px) {
    margin-top: 24px;
    #prediction-wrapper {
      height: 100%;
    }
  }
  @media screen and (max-width: 1400px) {
    .aside-progress-bar__item {
      margin-top: 0px !important;
      padding-top: 4px;
      padding-bottom: 4px;
      .item-text-field p {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .preview-img {
      width: 200px !important;
      height: 200px !important;
    }
    .upload-btn {
      svg {
        width: 50px !important;
        height: 50px !important;
      }
    }
    #prediction-wrapper
      .upload-field
      .upload-field__wrapper
      .upload-field__body {
      min-height: unset;
    }
  }

  @media screen and (max-width: 992px) {
    #prediction-wrapper .upload-field {
      display: block !important;
      .upload-field__wrapper {
        padding-left: 0px;
      }
      .aside-progress-bar {
        display: flex;
        border-right: none;
        width: 100%;
        justify-content: space-around;
        padding-right: 0px;
        .aside-progress-bar__item {
          flex-direction: column-reverse;
          margin-bottom: 24px;
          align-items: center;

          .item-text-field {
            width: 100%;
          }
          .progress-icon {
            width: 35px;
            height: 35px;
            margin: 0px;
            margin-bottom: 8px;
          }
          .dot {
            display: none;
          }
        }
      }
      .upload-field__wrapper {
        width: 100% !important;
        .preview-img {
          width: 250px !important;
          height: 250px !important;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .aside-progress-bar__item {
      .item-text-field h3 {
        font-size: 14px !important;
        line-height: 16px !important;
      }
    }
    .upload-field__wrapper {
      .right-side {
        p {
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: 16px !important;
        }
        .upload-description {
          li {
            font-size: 12px;
          }
        }
      }
    }
    .upload-field__wrapper {
      padding: 0px;
    }
    .upload-field__body {
      display: block;
      padding: 8px !important;
      .left-side,
      .right-side {
        margin-left: 0px !important;
        width: 100% !important;
        /* text-align:center; */
        p {
          background: none !important;
          padding: 0px !important;
          border: none !important;
          margin-bottom: 4px;
        }
      }
      .left-side {
        display: flex;
        justify-content: center;
      }
      .right-side {
        margin-top: 12px;
        p {
          text-align: center;
        }
        ul {
          padding-left: 0px;
          list-style-type: none !important;
          text-align: center;
        }
      }
    }
    .progress-icon {
      svg {
        width: 20px !important;
        height: 20px !important;
      }
    }
  }

  @media screen and (max-width: 576px) {
    .aside-progress-bar__item {
      .item-text-field h3 {
        text-align: center;
      }
    }
    #prediction-wrapper {
      padding: 8px;
    }
  }

  @media screen and (max-width: 400px) {
  }

  @media screen and (max-width: 300px) {
    #prediction-wrapper .upload-field .upload-field__wrapper .preview-img {
      width: 200px !important;
      height: 200px !important;
    }
  }
`;
