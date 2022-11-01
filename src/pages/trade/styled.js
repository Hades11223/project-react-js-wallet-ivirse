import styled, { css } from "styled-components";
const baseImageCss = () => css`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  min-height: 100vh;
  height: 100%;
`;
export const WrapperStyled = styled.div`
  position: relative;
  .content {
    z-index: 2;
  }
  .bg-galaxy {
    z-index: -1;
  }
  .global-icon {
    @media screen and (max-width: 991px) and (min-width: 768px) {
      display: none;
    }

    @media screen and (max-width: 767px) {
      display: none;
    }
  }
`;
export const TradeRouteWrapperStyled = styled.div`
  position: relative;

  overflow-y: scroll;

  .wrapper-container {
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;
    margin-top: calc(var(--trade-header-height));
    height: calc(100vh - var(--trade-header-height) - 66px);
    margin-bottom: 65px;
  }
  .home-page__background {
    img {
      ${baseImageCss}
    }
    #layer-1 {
      ${baseImageCss}
    }
    #layer-2 {
      mix-blend-mode: color-dodge;
      transform: rotate(-0.02deg);
      ${baseImageCss}
    }
    #layer-3 {
      mix-blend-mode: color-dodge;
      opacity: 0.3;
      transform: rotate(-0.02deg);
      ${baseImageCss}
    }
  }
  .vesting-background-layer {
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
    #vesting-layer-1 {
      mix-blend-mode: color-dodge;
      opacity: 0.5;
      transform: rotate(-0.02deg);
    }
    #vesting-layer-2 {
      mix-blend-mode: color-dodge;
      transform: rotate(-0.02deg);
    }
    #vesting-layer-3 {
      z-index: -1;
    }
  }
`;

export const PolicyWrapper = styled.div`
  padding: 0 5% 0 5%;
  color: #ffffff;
  font-size: 16px;
  line-height: 20px;
  text-align: justify;
  margin-bottom: 50px;
 
  @media screen and (max-width: 576px){
      font-size: 14px;
      line-height: 17px;
    }
  ul{
    list-style: disc;
  }
  p {
    margin-top : 8px;
    margin-bottom: 0;
  }
  .title-text {
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    @media screen and (max-width: 576px){
      font-size: 18px;
      line-height: 20px;
    }
  }
  .text-uppercase{
    text-transform : uppercase ;
  }
  .title-text-small{
    font-weight: 700;
  }
  .non-disc{
    list-style: none;
  }
`;
