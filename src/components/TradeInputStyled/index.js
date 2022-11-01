import { Select } from "antd";
import { TradeSelectStyled } from "./styled";

export const TradeSelect = ({ icon, tag, ...props }) => {
  return (
    <TradeSelectStyled {...props}>
      <div className="select-prefix">
        {icon}
        <span>{tag}</span>
      </div>
      <Select style={{ width: "100%" }} {...props} />
    </TradeSelectStyled>
  );
};
