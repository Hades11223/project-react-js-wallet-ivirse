import Header from "@layouts/trade/header";
import { getBackGroundFromScreen } from "@utils/";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { trade_routes } from "../constants";
import { TradeRouteWrapperStyled } from "./styled";

const TradeRoute = () => {
  const reduxSetScrWidth = useDispatch().global.setScrWidth;

  const [screentWidth, setScreentWidth] = useState(
    getBackGroundFromScreen(window.innerWidth)
  );

  useEffect(() => {
    const changeScrWidth = debounce(() => {
      setScreentWidth(getBackGroundFromScreen(window.innerWidth));
      reduxSetScrWidth(window.innerWidth);
    }, 300);
    window.addEventListener("resize", changeScrWidth);

    return () => {
      window.removeEventListener("resize", changeScrWidth);
    };
  }, []);

  return (
    <TradeRouteWrapperStyled>
      <Header />

      <div className={"home-page__background"}>
        <img src={require(`@images/trade/bg_${screentWidth}.png`)} alt="" />
      </div>

      <div className="wrapper-container">
        <Switch>
          {trade_routes.map(({ path, component, ...rest }, index) => {
            return (
              <Route key={index} path={path} component={component} {...rest} />
            );
          })}
          <Redirect to={"/"} />
        </Switch>
      </div>
    </TradeRouteWrapperStyled>
  );
};

export default TradeRoute;
