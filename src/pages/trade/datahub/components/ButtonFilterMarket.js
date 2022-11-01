import { ButtonX } from "@assets/svg";
import React from "react";
import { ButtonFilterMarketWrapper } from "./styled";

function ButtonFilterMarket({
  content = "",
  handleResetFilter =()=>{},
  value,
  keyFilter,
  updateNestedDataDispatch,
  filterNew,
  type,
  showButton,
  fromInput = "",
  toInput = "",
}) {
  const handleClickFilter = () => {
    if (type === "one") {
      updateNestedDataDispatch({
        filterCurrencies: null,
        fromValue: null,
        toValue: null,
      });
    } else if (type === "multi") {
      let vitri = filterNew?.filterStatus?.findIndex((val) => val === value);
      filterNew?.filterStatus?.splice(vitri, 1);
      updateNestedDataDispatch({ filterStatus: [...filterNew?.filterStatus] });
    } else {
      handleResetFilter();
    }
  };
  return (
    <ButtonFilterMarketWrapper className="hover-pointer ">
      
        <>
          <div className="d-flex align-items-center">
            {type === "multi" && (
              <span className="mr-2">
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
            {content?.filterCurrencies&&<span className="mr-2">
              {content?.filterCurrencies === 1
                ? "IVI"
                : content?.filterCurrencies === 2
                ? "IHI"
                : content?.filterCurrencies === 3
                ? "USDT"
                : ""}
            </span>}
            {(content?.fromValue || content?.toValue || content?.filterCurrencies) &&
              type === "one" && <ButtonX onClick={handleClickFilter} />}
            {type === "multi" && <ButtonX onClick={handleClickFilter} />}
          </div>




          {/* {fromInput && (
            <span className="mr-1">
              {keyFilter === "filterCurrencies" &&
                fromInput &&
                `Min ${fromInput} ${content}`}
            </span>
          )}
          {toInput && (
            <span className="mr-1">
              {keyFilter === "filterCurrencies" &&
                toInput &&
                `Max ${toInput} ${content}`}
            </span>
          )}
          <span className="mr-1">{!fromInput && !toInput && content}</span>
          {keyFilter!=="filterCurrencies"&&<span className="pr-2">{content}</span>}
          {content && <ButtonX />} */}
        </>
      
    </ButtonFilterMarketWrapper>
  );
}

export default ButtonFilterMarket;
