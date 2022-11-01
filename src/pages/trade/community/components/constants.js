export const ADMIN_COLUMNS = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    render: (_, __, idx) => idx + 1,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Consent",
    dataIndex: "consent",
    key: "consent",
    render: (consent) => (consent ? "Accept" : "Reject"),
  },
];
export const CREATE_CAMPAIGN = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    render: (_, __, idx) => idx + 1,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];
export const CAMPAIGN_COLUMNS = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (status ? "Claimed" : "Not claim"),
  },
];
