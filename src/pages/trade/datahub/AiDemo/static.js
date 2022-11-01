import LinearText from "@pages/trade/components/LinearText";
import { AiPredictIcon, AiUploadIcon, AiWaitingIcon } from "@assets/svg";
import { Steps } from "antd";

const { Step } = Steps;

export const StaticComponent = ({ scrWidth }) => ({
  "title-one": (
    <LinearText
      title={"Brain Tumor Prediction"}
      fontSize={scrWidth > 992 ? "40px" : scrWidth > 576 ? "35px" : "30px"}
      lineHeight={scrWidth > 992 ? "35px" : scrWidth > 576 ? "30px" : "25px"}
      margin="10px"
    />
  ),
  "title-two-and-text": (
    <>
      <LinearText
        title={"Brain tumor detection"}
        fontSize={scrWidth > 992 ? "30px" : scrWidth > 576 ? "25px" : "20px"}
        lineHeight={scrWidth > 992 ? "35px" : scrWidth > 576 ? "30px" : "25px"}
        margin="4px"
      />
      <p className="des-text">
        Diagnostics are based on modern artificial intelligence algorithms.{" "}
      </p>
    </>
  ),
});

export const AsideProgress = ({ current, ...props }) => {
  console.log("current", current);
  const ProgressIcon = ({ Icon, isActive }) => (
    <div className={`progress-icon${isActive ? " active" : ""}`}>
      <Icon />
    </div>
  );
  const listProgress = [
    {
      title: "Upload your document",
      description: "Only file formats are supported.",
      iconActive: <ProgressIcon Icon={AiUploadIcon} isActive={true} />,
      iconInactive: <ProgressIcon Icon={AiUploadIcon} isActive={true} />,
    },
    {
      title: "Waiting for analysis",
      description:
        "Data is being thoroughly analyzed by artificial intelligence.",
      iconActive: <ProgressIcon Icon={AiWaitingIcon} isActive={true} />,
      iconInactive: <ProgressIcon Icon={AiWaitingIcon} isActive={false} />,
    },
    {
      title: "Predicted results",
      description: "The results obtained have an accuracy of up to 96.69%.",
      iconActive: <ProgressIcon Icon={AiPredictIcon} isActive={true} />,
      iconInactive: <ProgressIcon Icon={AiPredictIcon} isActive={false} />,
    },
  ];

  return (
    <div {...props} className="aside-progress-bar">
      {listProgress.map((item, index) => (
        <div
          className="aside-progress-bar__item d-flex justify-content-space-between"
          key={index}
        >
          <div className="item-text-field">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          {current >= index ? item.iconActive : item.iconInactive}
          <span className={`dot${current >= index ? " active" : ""}`}></span>
        </div>
      ))}
    </div>
  );
};
