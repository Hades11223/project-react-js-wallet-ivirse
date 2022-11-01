import API_VAR from "@constants/api";
import axiosUtils from "@utils/datahub-axios-utils";
import axiosBaseProvider from "./axios-base-provider";

const keywordProvider = {
  ...axiosBaseProvider(API_VAR.KEYWORD),
};
export default keywordProvider;
