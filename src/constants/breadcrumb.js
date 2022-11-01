const BreadCrumMapping = (path) => {
  switch (path) {
    case "/data-hub":
      return "Data Marketplace";
    case "/data-hub/profile/collected":
      return "Collected";
    case "/data-hub/profile/liked":
      return "Liked";
    default:
      return "Data Marketplace";
  }
};

export const ListBreadCrumb = [
  "/data-hub",
  "/data-hub/profile/collected",
  "/data-hub/profile/liked",
];

export default BreadCrumMapping;
