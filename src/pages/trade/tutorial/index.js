import { TutorialAnimation } from "@assets/animation";
import { TutorialSvg } from "@assets/svg";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { ButtonAdmin } from "../AdminCommunity/Adminlist/components/AdminComponent";
import LinearText from "../components/LinearText";
import { TutorialWrapper } from "./styled";

const Tutorial = () => {
  const { width } = useDebounceWindowResize();
  return (
    <TutorialWrapper>
      <div className="text-wrapper mt-7">
        {width > 400 ? (
          <LinearText
            title={"Welcome"}
            className="margin-text-2"
            fontSize={"40px"}
            lineHeight={"40px"}
          />
        ) : (
          <LinearText
            title={"Get Started"}
            className="margin-text-2"
            fontSize={"20px"}
            lineHeight={"20px"}
          />
        )}
      </div>
      <div className="d-flex align-items-center h-full justify-content-center">
        <div className="content-wrapper">
          <div className="content-wrapper__animation">
            <div className="animation">
              <TutorialAnimation />
            </div>
            <div className="content-wrapper__animation__text">
              <span>Don’t know how to get started?&nbsp;</span>
              <span>
                We have&nbsp;
                <TutorialSvg />
                &nbsp; for you
              </span>
            </div>
            <div className="content-wrapper__animation__button">
              <ButtonAdmin
                // border
                type={"high"}
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/playlist?list=PLmoqC0Z5AOPkDSHI3S5GlymVVhhhEsRHO",
                    "_blank"
                  );
                }}
              >
                Click here to explore
              </ButtonAdmin>
            </div>
          </div>
        </div>
      </div>
    </TutorialWrapper>
  );
};

export default Tutorial;
