import styled from "styled-components";

export const HomeStyled = styled.div`
@media (max-width:576px) {
    .big-text {
      div:first-child {
        font-size: 40px;
        line-height: 42px;
      }
      div:last-child {
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 0px;
      }
    }
    .small-text {
      font-size: 14px!important;
      margin-bottom: 0px;
    }
    .home-page__header {
      height: 80px;
    }
    .home-page__footer-right {
      margin-top:12px;
      div {
        font-size: 16px!important;
      }
    }
  }
  width: 100%;
  min-height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
  .connect-wallet-btn {
      background: radial-gradient(
          96.92% 1534.99% at 95.38% 91.84%,
          #915fcd 7.32%,
          #ae5297 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      border-radius: 20px;
      border: none;
      span {
        color: white;
        margin-left: 4px;
      }
    }
  .home-page__background {
    img {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      /* opacity: 0.7; */

    }
    #layer-1 {
      z-index: -1;
    }
    #layer-2 {
      mix-blend-mode: color-dodge;
      z-index: -1;
    }
    #layer-3 {
      mix-blend-mode: color-dodge;
      opacity: 0.2;
      z-index: -1;
    }
  }
  .home-page__header {
    height: 150px;
    @media screen and (min-width:460px ) and (max-height: 450px){
      height: 65px;
    }
    .logo-home {
      width: 100px;
      height: 100%;

      svg {
        font-size: 100px;
      }
    }
    
  }

  .home-page__body {
    @media screen and (min-width:460px ) and (max-height: 450px){
      margin-top: 0;
    }
    margin-top: 20px;
    .home-page__body-content {
      width: 50%;
      .big-text {
        @media screen and (min-width:460px ) and (max-height: 450px){
          &-up{
            line-height: normal;
            font-size: 40px;
          }
          &-down{
            line-height: normal;
            font-size: 25px;
          }
        }
      }
      .small-text {
        padding: 16px 0px;
        color: white;
        font-size: 16px;
        font-weight: 400;
        @media screen and (min-width:460px ) and (max-height: 450px){
          padding: 0;
        }
      }
    }
  }

  .home-page__footer {
    height: 50px;
    position: absolute;
    bottom: 40px;
    padding: 0 5%;
    left: 0;
    right: 0;
    @media screen and (max-width: 576px) {
      height: auto;
    }
    @media screen and (min-width:460px ) and (max-height: 450px){
      display: flex;
      bottom: 0;
    }
    .home-page__footer-left {
      display: flex;
      align-items: flex-end;
    }
    .home-page__footer-right {
      span {
        text-transform: uppercase;
        font-family: "Walk The Moon Expanded Italic", sans-serif;
      }
    }
  }

  /* Responsive */
  @media (max-width: 992px) {
    .home-page__body-content {
      width: 100% !important;
      .small-text {
        width: 90%;
      }
    }
  }

  
`;
