import {
  CheckOutlined,
  DisconnectOutlined,
  PlusOutlined,
  UserOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { CorrectLine, WrongLine } from "@assets/animation";
import { AiDemoIcon, ConvertCardIcon, ProfileIcon } from "@assets/svg";
import snackbarUtils from "@utils/snackbar-utils";
import { Avatar, Button, Form, Input, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AccountPanelHead = ({
  currentContractProperties = {},
  coinBalance = 0,
  address,
  history,
}) => {
  return (
    <div className="account-panel__header">
      <div className="account-check-active">
        <CheckOutlined />
      </div>
      <div className="account-info">
        <div className="account-info__avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
        <div className="account-info__txt">
          <Tooltip title={address} placement="bottomLeft">
            <p className="account-info__name">{address}</p>
          </Tooltip>
          <p className="account-info__asset">
            {coinBalance} <span>{currentContractProperties?.nameCoin}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountPanelStaticItem = [
  {
    link: "/data-hub/profile/collected",
    Icon: ProfileIcon,
    text: "Profile",
  },
  {
    link: "/data-hub/deposit",
    Icon: ConvertCardIcon,
    text: "Deposit",
  },
  {
    link: "/data-hub/ai-demo-page",
    Icon: AiDemoIcon,
    text: "Brain Tumor Prediction",
  },
];

export const AccountPanelBody = ({
  onOpenDrawer,
  mint,
  showDisconect = true,
  history,
  closePanel,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const disconnect = useDispatch().contracts?.disconnect;

  const isOwner = useSelector((state) => state?.contracts?.isOwner);
  const isAdmin = useSelector((state) => state?.community?.isAdmin);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (value) => {
    setLoading(true);
    mint({ address: value.address, amount: parseFloat(value.amounts) })
      .then((res) => {
        snackbarUtils.success("Mint success!", <CorrectLine />);
        handleCancel();
      })
      .catch((err) => {
        snackbarUtils.error("Mint fail!", <WrongLine />);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ul className="list-account-option">
      {isAdmin && (
        <li className="list-account-option__item">
          <div className="option-icon">
            <UserOutlined />
          </div>
          <Button
            className="option-title__onclick"
            onClick={() => {
              if (isAdmin) {
                localStorage.setItem("role", "admin");
                history.push("/admin-community");
              } else {
                snackbarUtils.error("You are not admin!");
              }
            }}
          >
            Account admin information
          </Button>
        </li>
      )}

      {isOwner && (
        <li className="list-account-option__item">
          <div className="option-icon">
            <PlusOutlined />
          </div>
          <Button className="option-title__onclick" onClick={showModal}>
            Mint Coin (owner)
          </Button>
          <Modal
            title="Mint coin"
            visible={isModalVisible}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input className="input-1" />
              </Form.Item>

              <Form.Item
                label="Amounts"
                name="amounts"
                rules={[{ required: true, message: "Please input amounts!" }]}
              >
                <Input className="input-1" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="global-button-1"
                  disabled={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </li>
      )}

      {/*Profile ; Deposit */}
      {AccountPanelStaticItem?.map((item, index) => (
        <Link
          to={item?.link}
          style={{ display: "flex" }}
          className="link-option__wrapper"
        >
          <li className="list-account-option__item" key={index}>
            <div className="option-icon">
              <item.Icon className={`option-icon-${index}`} />
            </div>
            <Button
              style={
                `${item?.text}` === "Deposit"
                  ? { "margin-left": "-6px" }
                  : `${item?.text}` === "Profile"
                  ? { "margin-left": "-1.5px" }
                  : {}
              }
              className="option-title__onclick"
            >
              {item?.text}
            </Button>
          </li>
        </Link>
      ))}

      {showDisconect && (
        <li
          className="list-account-option__item"
          id="disconnect-btn"
          onClick={() => {
            disconnect();
          }}
        >
          <div className="option-icon">
            <DisconnectOutlined />
          </div>
          <Button className="option-title__onclick">
            <Link to="/"> Disconnect Account</Link>
          </Button>
        </li>
      )}
    </ul>
  );
};
