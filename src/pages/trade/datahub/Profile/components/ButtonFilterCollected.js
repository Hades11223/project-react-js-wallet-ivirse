import { ButtonX } from "@assets/svg";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ButtonFilterCollectedWrapper } from "./styled";

function ButtonFilterCollected({ content, type = "" }) {
  const updateNestedDataDispatch = useDispatch()?.datasharing?.updateNestedData;
  const activeCheckbox = useSelector(
    (state) => state?.datasharing?.sidebarFilter.listStatus
  );
  const handleClickFilter = () => {
    if (type === "one") {
      updateNestedDataDispatch({
        sidebarFilter: {
          tokens: null,
          fromValue: null,
          toValue: null,
          listStatus: activeCheckbox,
        },
      });
    } else if (type === "multi") {
      let vitri = activeCheckbox.findIndex((val) => val === content);
      activeCheckbox.splice(vitri, 1);
      updateNestedDataDispatch({
        sidebarFilter: {
          listStatus: activeCheckbox,
        },
      });
    }
  };
  return (
    <ButtonFilterCollectedWrapper className="hover-pointer">
      <div className="d-flex align-items-center">
        {type === "multi" && (
          <span className="mr-2 min-width40">
            {content === 1
              ? "Buy Now"
              : content === 2
              ? "On Auction"
              : content === 3
              ? "Recently Granted"
              : ""}
          </span>
        )}
        {content?.fromValue && (
          <span className="mr-1">{`Min ${content.fromValue}`}</span>
        )}
        {content?.toValue && (
          <span className="mr-1">{`${
            content?.fromValue && content?.toValue ? ", " : ""
          }Max ${content.toValue}`}</span>
        )}
        {content?.tokens&&<span className="mr-2 min-width40">
          {content?.tokens === 1
            ? "IVI"
            : content?.tokens === 2
            ? "IHI"
            : content?.tokens === 3
            ? "USDT"
            : ""}
        </span>}
        {(content?.fromValue || content?.toValue || content?.tokens) &&
          type === "one" && <ButtonX className="buttonX" onClick={handleClickFilter} />}
        {type === "multi" && <ButtonX className="buttonX" onClick={handleClickFilter} />}
      </div>
    </ButtonFilterCollectedWrapper>
  );
}

export default ButtonFilterCollected;
