import { CloudUploadOutlined } from "@ant-design/icons";
import ProcessingAnimation from "@assets/gif/ai-processing.gif";
import TradeButton from "@components/TradeButton";
import AiUploadFileProvider from "@data-access/ai-file-upload-provider";
import useCustomState from "@hook/useCustomState";
import { UrlServer } from "@utils/ai-axios-utils";
import snackbarUtils from "@utils/snackbar-utils";
import { message, Upload } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AsideProgress, StaticComponent } from "./static";
import { AiDemoPageWrapper } from "./styled";

const RenderItemWithProgress = ({ progress, data = {} }) => {
  switch (progress) {
    case 0:
      return (
        <>
          <p>Browse your files</p>
          <ul className="upload-description">
            <li>Image format accepted: JPG, JPEG, PNG </li>
          </ul>
        </>
      );
    case 1:
      return (
        <>
          <p>Processing file</p>
          <ul className="upload-description">
            <li>Please wait a minutes</li>
          </ul>
        </>
      );
    case 2:
      return (
        <>
          <p>Prediction for you</p>
          <ul className="upload-description">
            <li>
              <span className="mr-3">Prediction:</span>
              <span>{data}</span>
            </li>
          </ul>
        </>
      );
    default:
      return "";
  }
};

const AiDemoPage = () => {
  const { scrWidth } = useSelector((state) => state.global);
  const [state, setState] = useCustomState({
    currentProgress: 0,
    imgUrl: null,
    loading: false,
    fileList: [],
    isCanPredict: false,
    predictedUrl: null,
    prediction: "",
  });
  const serverDomain = UrlServer();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleChangeFile = ({ fileList: newFileList }) => {
    let file = (newFileList || [])[0];
    if (file?.status === "done") {
      if (["image/jpeg", "image/png", "image/jpg"].includes(file?.type)) {
        getBase64(file.originFileObj, (url) => {
          setState({
            fileList: newFileList,
            imgUrl: url,
            predictedUrl: null,
            isCanPredict: true,
            currentProgress: 0,
          });
        });
      } else {
        setState({
          fileList: [],
          imgUrl: null,
          isCanPredict: false,
          predictedUrl: null,
          currentProgress: 0,
        });
        message.info("You must upload image type: jpg, jpeg, png...");
      }
    }
  };

  const handleRemovePreviewImg = () => {
    setState({
      imgUrl: null,
      isCanPredict: false,
      predictedUrl: null,
      currentProgress: 0,
    });
  };

  const handleMakePrediction = () => {
    let file = (state.fileList || [])[0]?.originFileObj;
    setState({
      currentProgress: 1,
      isCanPredict: false,
    });
    AiUploadFileProvider.upload(file)
      .then((res) => {
        if (res?.data?.code === 200) {
          setState({
            currentProgress: 2,
            predictedUrl: `${serverDomain}/api/v1/${res?.data?.bbox_image_url}`,
            prediction:
              res?.data?.prediction?.toLowerCase() == "no"
                ? "No abnormal detection"
                : "Abnormal detection",
            isCanPredict: true,
          });
        }
      })
      .catch((err) => {
        snackbarUtils.error(err?.message);
      });
  };

  return (
    <AiDemoPageWrapper>
      {StaticComponent({ scrWidth })["title-one"]}
      <div id="prediction-wrapper">
        <div className="upload-field d-flex">
          <AsideProgress current={state.currentProgress} />
          <div className="upload-field__wrapper">
            <div className="upload-field__body d-flex justify-content-space-between">
              <div className="left-side">
                {[0, 2].includes(state.currentProgress) ? (
                  <Upload
                    action=""
                    onChange={handleChangeFile}
                    maxCount={1}
                    method="GET"
                    onRemove={handleRemovePreviewImg}
                    accept=".png, .jpg, .jpeg"
                  >
                    {state.imgUrl === null ? (
                      <button className="upload-btn">
                        <CloudUploadOutlined />
                      </button>
                    ) : (
                      <img
                        className="preview-img"
                        src={
                          state.currentProgress === 2
                            ? state.predictedUrl
                            : state.imgUrl
                        }
                        alt=""
                      />
                    )}
                  </Upload>
                ) : (
                  <img
                    className="progressing-animation"
                    src={state.currentProgress === 1 && ProcessingAnimation}
                    alt=""
                  />
                )}
              </div>
              <div className="right-side">
                <RenderItemWithProgress
                  progress={state.currentProgress}
                  data={state.prediction}
                />
              </div>
            </div>
            <TradeButton
              onClick={handleMakePrediction}
              content={"Making prediction"}
              type="gradient"
              disabled={!state.isCanPredict}
              parentClassName="predict-btn d-flex justify-content-center"
            />
          </div>
        </div>
      </div>
    </AiDemoPageWrapper>
  );
};

export default AiDemoPage;
