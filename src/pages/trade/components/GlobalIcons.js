import { memo } from "react";
import { Link } from "react-router-dom";
import { Divider } from "../vesting/components/styled";
import { IconData } from "./constants";
import { GlobalIconsWrapper } from "./styled";

const GlobalIcons = () => {
  return (
    <GlobalIconsWrapper>
      <div
        className={`${
          window.location.pathname == "/data-hub" ? "" : "testclass"
        }`}
      >
        <div>
          {Object.keys(IconData).map((key, index) => {
            let Icon = IconData[key].icon;
            return (
              <a href={IconData[key].link} key={index} target="_blank">
                <Icon />
              </a>
            );
          })}
        </div>
        <Divider opacity={0.2} marginBottom={10} />
        <div className="policy d-flex justify-content-space-between mb-2">
          <div className="text-italic">IVIRSE © 2022</div>
          <div className="d-flex ">
            <Link className="text-white" to={"/policy"}>
              Privacy Policies
            </Link>
            <div className="pl-4">Terms of Service</div>
          </div>
        </div>
      </div>
    </GlobalIconsWrapper>
  );
};
export default memo(GlobalIcons);
