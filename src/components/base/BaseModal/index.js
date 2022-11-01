import { DeleteOutlined } from "@ant-design/icons";
import ModalHeader from "@pages/trade/components/ModalHeader";
import { LinearButton } from "@pages/trade/components/styled";
import { Button } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BaseModalWrapper } from "./styled";

const BaseModal = (
  {
    title = "",
    cancelText = "Cancel",
    submitText = "Ok",
    renderForm = () => {},
    ignoreCancel = false,
    ignoreCancelButton = false,
    ignoreOkButton = false,
  },
  ref
) => {
  const callbackRef = useRef();
  const submitRef = useRef();
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  useImperativeHandle(ref, () => ({
    show: ({ callback = () => {}, submit = () => {} }) => {
      setState({ visible: true });
      if (callback) callbackRef.current = callback;
      if (submit) submitRef.current = submit;
    },
  }));
  const onCancel = () => {
    if (callbackRef.current) {
      callbackRef.current();
    }
    setState({ visible: false });
  };

  return (
    <BaseModalWrapper
      title={<ModalHeader title={title} callback={onCancel} />}
      visible={state.visible}
      onCancel={onCancel}
      closable={true}
      footer={
        <div className="d-flex">
          {!ignoreCancelButton && (
            <Button className="delete__btn" onClick={onCancel}>
              <DeleteOutlined />
              {cancelText}
            </Button>
          )}
          {!ignoreOkButton && (
            <LinearButton
              className="submit__btn"
              onClick={async () => {
                try {
                  await submitRef.current();
                  if (!ignoreCancel) onCancel();
                } catch (err) {}
              }}
            >
              {submitText}
            </LinearButton>
          )}
        </div>
      }
    >
      {renderForm()}
    </BaseModalWrapper>
  );
};
export default forwardRef(BaseModal);
