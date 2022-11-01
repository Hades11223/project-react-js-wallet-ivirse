import { AiDemoIcon, ConvertCardBlack, ProfileIcon } from "@assets/svg";
import { AddressTooltip } from "@pages/trade/components/AddressTooltip";
import { IconData } from "@pages/trade/components/constants";
import { CollapseIcon, IviIcon, MintCoinIcon } from "@svg";
import { getLengthAddress } from "@utils";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Collapse, Divider, Drawer } from "antd";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ADMIN_LIST } from "./adminConstants";
import { TRADE_HEADER_ITEMS } from "./constants";
import { HeaderMenuWrapper } from "./styled";
const { Panel } = Collapse;

const DrawerHeader = (props) => {
  const disconnect = useDispatch().contracts?.disconnect;
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const { balance, address, symbol = "", updateTab } = props;
  const isAdmin = useSelector((state) => state?.community?.isAdmin);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleChangeCollapse = (key) => {};
  const isOwner = useSelector((state) => state?.contracts?.isOwner);

  const handleChangeTab = (tabVal) => {
    updateTab({ activeNavItem: tabVal });
  };
  //
  const MyWalletItemList = [
    {
      Icon: ProfileIcon,
      text: "Profile",
      onClick: () => {
        props.ownerGetCollectedData();
        history.push("/data-hub/profile/collected");
      },
      showCond: true,
    },
    {
      Icon: MintCoinIcon,
      text: "Mint Coin (owner)",
      onClick: () => {},
      showCond: isOwner,
    },

    {
      Icon: ConvertCardBlack,
      text: "Deposit",
      onClick: () => {
        history.push("/data-hub/deposit");
      },
      showCond: true,
    },
    {
      Icon: AiDemoIcon,
      text: "Brain Tumor Prediction",
      showCond: true,
      onClick: () => {
        history.push("/data-hub/ai-demo-page");
      },
    },
  ];

  return (
    <HeaderMenuWrapper>
      <Button type="primary" onClick={showDrawer} className="menu-ipad">
        <CollapseIcon />
      </Button>
      <Drawer
        placement="right"
        onClose={onClose}
        visible={visible}
        title={
          <div className="d-flex justify-content-space-between drawer-user-info__container">
            <div className="content-left">
              <div className="copy-tooltip">
                <AddressTooltip
                  address={address}
                  getLengthAddress={getLengthAddress(
                    address,
                    window.innerWidth
                  )}
                />
              </div>

              <div className="drawer-header-title-balance">
                <span className="ivi-icon">
                  <IviIcon width={24} height={24} />
                </span>

                <span>{`${balance?.formatCurrency() || 0} ${symbol}`}</span>
              </div>
              <Button
                className="drawer-header-title-button1"
                onClick={() => {
                  disconnect();
                }}
              >
                <Link to="/tutorial"> Disconnect</Link>
              </Button>
            </div>
            {/* <div className="content-right">
              <Button
                className="navigate-profile-btn"
                onClick={() => {
                  props.ownerGetCollectedData();
                  history.push("/data-hub/profile/collected");
                }}
              >
                <RightOutlined />
              </Button>
            </div> */}
          </div>
        }
      >
        <div className="overflow-scroll-phong">
          {isAdmin && (
            <>
              {Object.keys(ADMIN_LIST).map((key, index) => {
                let item = ADMIN_LIST[key];
                return (
                  <NavLink
                    className="drawer-header-body-item"
                    activeClassName="active-nav-link"
                    key={index}
                    to={item.path}
                    onClick={() => {
                      if (isAdmin) {
                        localStorage.setItem("role", "admin");
                      } else {
                        snackbarUtils.error("You are not admin!");
                      }
                      handleChangeTab(item?.tab);
                    }}
                  >
                    <div>{item.text}</div>
                  </NavLink>
                );
              })}
              <div className="line"></div>
            </>
          )}

          {Object.keys(TRADE_HEADER_ITEMS).map((key, index) => {
            let item = TRADE_HEADER_ITEMS[key];
            return (
              // <Link className="drawer-header-body-item" key={index} to={item.path}>
              //   <div >{item.text}</div>
              // </Link>
              <NavLink
                className="drawer-header-body-item"
                activeClassName="active-nav-link"
                key={index}
                to={item.path}
              >
                {" "}
                <div>{item.text}</div>
              </NavLink>
            );
          })}
          <div className="drawer-header-body-item" id="wallet-collapse">
            <Collapse
              expandIconPosition="end"
              bordered={false}
              // defaultActiveKey={["1"]}
              onChange={handleChangeCollapse}
            >
              <Panel
                header={
                  <div className="drawer-header-body-item">My Wallet</div>
                }
                key={"1"}
              >
                <ul>
                  {MyWalletItemList?.map(
                    (item, index) =>
                      item?.showCond && (
                        <li key={index}>
                          <Button
                            onClick={item.onClick}
                            className="wallet-action_btn d-flex align-items-center"
                          >
                            <item.Icon />
                            <span>{item?.text}</span>
                          </Button>
                        </li>
                      )
                  )}
                </ul>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className="footer-drawer">
          <div className="footer-drawer-icon">
            {Object.keys(IconData).map((key, index) => {
              let Icon = IconData[key].icon;
              return (
                <a href={IconData[key].link} key={index} target="_blank">
                  <Icon />
                </a>
              );
            })}
          </div>
          <Divider style={{ margin: 0 }} />
          <div className="policy d-flex justify-content-space-between mb-2">
            <div className="text-italic">IVIRSE © 2022</div>
            <div className="d-flex-column ">
              <Link to={"/policy"}>Privacy Policies</Link>
              <Link>Terms of Service</Link>
            </div>
          </div>
        </div>
      </Drawer>
    </HeaderMenuWrapper>
  );
};

const mapStateToProps = ({
  contracts: {
    address,
    balance,
    currentNetworkName,
    type,
    currentContractProperties,
    symbol,
    coinBalance,
  },
}) => ({
  address,
  balance,
  currentNetworkName,
  type,
  currentContractProperties,
  symbol,
  coinBalance,
});

const mapDispatchToProps = ({
  contracts: { connect, disconnect, getBalance, changeNetwork, mint },
  community: { updateData },
  datasharing: { ownerGetCollectedData },
}) => ({
  connect,
  disconnect,
  changeNetwork,
  mint,
  updateTab: updateData,
  ownerGetCollectedData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeader);
