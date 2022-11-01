import { DeleteOutlined } from "@ant-design/icons";
import adminProvider from "@data-access/admin-provider";
import ModalHeader from "@pages/trade/components/ModalHeader";
import { LinearButton } from "@pages/trade/components/styled";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Form, Input } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { NewModal as Modal } from "./styled";

const EditNameModal = (props, ref) => {
  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const callbackRef = useRef();
  useImperativeHandle(ref, () => ({
    show: ({ callback = () => {}, record = {} }) => {
      callbackRef.current = callback;
      setState({ visible: true, record });
      form.setFieldsValue(record);
    },
  }));
  const onCancel = () => {
    callbackRef.current();

    setState({ visible: false });
  };
  const [form] = Form.useForm();
  return (
    <Modal
      title={<ModalHeader title={"Create New Admin"} callback={onCancel} />}
      visible={state.visible}
      onCancel={onCancel}
      closable={true}
      footer={
        <React.Fragment>
          <Button className="delete__btn" onClick={onCancel}>
            <DeleteOutlined />
            Close
          </Button>
          <LinearButton
            className="submit__btn"
            onClick={() => {
              form.validateFields();
              let obj = form.getFieldsValue();
              adminProvider
                .patch(state.record.id, {
                  name: obj.name,
                })
                .then((res) => {
                  if (res.code == 0) {
                    snackbarUtils.success("Edit success!");
                    onCancel();
                  } else {
                    throw new Error();
                  }
                })
                .catch((err) => {
                  snackbarUtils.error("Edit fail!");
                });
            }}
          >
            Edit{" "}
          </LinearButton>
        </React.Fragment>
      }
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        labelAlign="left"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input admin's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Wallet Address" name="walletAddress">
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(EditNameModal);
