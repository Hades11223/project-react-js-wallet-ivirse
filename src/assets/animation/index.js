import React from "react";
import Lottie from "react-lottie";
import correctline from "./correctline";
import emptyLottie from "./emptyLottie";
import loadingcampaign from "./loadingcampaign";
import renounce from "./renounce";
import tutorial from "./tutorial";
import verify from "./verify";
import wrongline from "./wrongline";
import waitingRequest from "./waiting_request";

const LottieAnimation = (animationData) => () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};
export const CorrectLine = LottieAnimation(correctline);
export const WrongLine = LottieAnimation(wrongline);
export const Renounce = LottieAnimation(renounce);
export const Verify = LottieAnimation(verify);
export const EmptyLottie = LottieAnimation(emptyLottie);
export const LoadingCampaign = LottieAnimation(loadingcampaign);
export const TutorialAnimation = LottieAnimation(tutorial);
export const WaitingRequestAnimation = LottieAnimation(waitingRequest);
