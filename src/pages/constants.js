import WithERC20 from "@layouts/ERC20Component";
import React, { Suspense } from "react";

// trade
const TradeTutorial = React.lazy(() => import("@pages/trade/tutorial"));
const TradeWallet = React.lazy(() => import("@pages/trade/wallet"));
const Contract = React.lazy(() => import("@pages/trade/contract"));
const Balances = React.lazy(() => import("@pages/trade/balances"));
const Transfers = React.lazy(() => import("@pages/trade/transfers"));
const Vesting = React.lazy(() => import("@pages/trade/vesting"));
const TradeCommunity = React.lazy(() => import("@pages/trade/community"));
const AdminCommunity = React.lazy(() => import("@pages/trade/AdminCommunity"));
const DataHub = React.lazy(() => import("@pages/trade/datahub"));
const DataHubAssetDetail = React.lazy(() =>
  import("@pages/trade/datahub/AssetDetail")
);
const Policy = React.lazy(() => import("@pages/trade/policy"));
const Deposit = React.lazy(() => import("@pages/trade/datahub/deposit"));
const Profile = React.lazy(() => import("@pages/trade/datahub/Profile"));
const DashBoard = React.lazy(() =>
  import("@pages/trade/datahub/Profile/DashBoard")
);

/* AI demo route */
const AiDemoPage = React.lazy(() => import("@pages/trade/datahub/AiDemo"));
/**--------------- */

const TradePage = (Component) => (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <WithERC20
        Component={(props2) => <Component {...{ ...props, ...props2 }} />}
      />
    </Suspense>
  );
};

export const trade_routes = [
  {
    component: TradePage(TradeTutorial, []),
    accessRoles: [],
    path: ["/tutorial"],
    exact: true,
  },
  {
    component: TradePage(TradeWallet, []),
    accessRoles: [],
    path: ["/transfer"],
    exact: true,
  },

  {
    component: TradePage(Contract, []),
    accessRoles: [],
    path: ["/contract"],
    exact: true,
  },
  {
    component: TradePage(Balances, []),
    accessRoles: [],
    path: ["/balances"],
    exact: true,
  },
  {
    component: TradePage(Transfers, []),
    accessRoles: [],
    path: ["/transfers-scan"],
    exact: true,
  },
  // {
  //   component: TradePage(NTF, []),
  //   accessRoles: [],
  //   path: ["/ntf"],
  //   exact: true,
  // },
  {
    component: TradePage(Vesting, []),
    accessRoles: [],
    path: ["/vesting"],
    exact: true,
  },
  {
    component: TradePage(TradeCommunity, []),
    accessRoles: [],
    path: ["/community"],
    exact: true,
  },
  {
    component: TradePage(AdminCommunity, []),
    accessRoles: [],
    path: ["/admin-community"],
    exact: true,
  },
  {
    component: TradePage(DataHub, []),
    accessRoles: [],
    path: ["/data-hub"],
    exact: true,
  },
  {
    component: TradePage(DataHubAssetDetail, []),
    accessRoles: [],
    path: ["/data-hub/asset-detail/:id"],
    exact: true,
  },
  {
    component: TradePage(Deposit, []),
    accessRoles: [],
    path: ["/data-hub/deposit"],
    exact: true,
  },
  {
    component: TradePage(Profile, []),
    accessRoles: [],
    path: ["/data-hub/profile"],
    // exact: true,
  },
  {
    component: TradePage(Policy, []),
    accessRoles: [],
    path: ["/policy"],
    // exact: true,
  },
  // {
  //   component: TradePage(DashBoard, []),
  //   accessRoles: [],
  //   path: ["/data-hub/profile/dashboard"],
  //   exact: true,
  // },
  {
    component: TradePage(AiDemoPage, []),
    accessRoles: [],
    path: ["/data-hub/ai-demo-page"],
  },
];

export const theme = {};
