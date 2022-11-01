import { Button, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import readXlsxFile from "read-excel-file";

const AddCampaignModal = (prop, ref) => {
  const [state, _setState] = useState({ visible: false, renderForm: () => {} });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const callbackRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      show: ({ callback = () => {} }) => {
        setState({ visible: true });
        callbackRef.current = callback;
      },
    }),
    []
  );
  const onCancel = () => {
    setState({ visible: false });
  };
  const [form] = Form.useForm();
  const onFinish = () => {
    let fieldValues = form.getFieldsValue();
    callbackRef.current({ investors: state.investors, ...fieldValues });
    onCancel();
  };
  return (
    <Modal
      visible={state.visible}
      footer={null}
      className="safe-mint-modal"
      onCancel={onCancel}
      title="Create new campaign"
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Campaign name"
          name="campaignName"
          rules={[{ required: true, message: "Please enter campaign name!" }]}
        >
          <Input className="input-1" />
        </Form.Item>

        <Form.Item
          label="Claim time"
          name="claimTime"
          rules={[{ required: true, message: "Please chose claim time!" }]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
          />
        </Form.Item>

        <Form.Item
          label="Participants"
          name="participants"
          rules={[{ required: true, message: "Please chose claim time!" }]}
        >
          <Input
            type="file"
            id="import-excel-input"
            onChange={(e) => {
              let file = e.target.files[0];
              readXlsxFile(file).then((rows) => {
                rows.shift();
                setState({
                  investors: rows.map((arr) => ({
                    address: arr[0],
                    amount: arr[1],
                  })),
                });
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default forwardRef(AddCampaignModal);
