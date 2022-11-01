import React from "react";
import { IconData } from "@pages/trade/components/constants";
import { GlobalIconsWrapper } from "./styled";
export default function GlobalIcons() {
  return (
    <GlobalIconsWrapper>
      {Object.keys(IconData).map((key, index) => {
        let Icon = IconData[key].icon;
        return (
          <a href={IconData[key].link} key={index} target="_blank">
            <Icon />
          </a>
        );
      })}
    </GlobalIconsWrapper>
  );
}
