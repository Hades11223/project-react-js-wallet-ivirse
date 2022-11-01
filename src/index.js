/* global BigInt */

import ScrollToTop from "@components/ScrollToTop";
import "antd/dist/antd.min.css";
import GA4React from "ga-4-react";
import i18next from "i18next";
import "mainam-react-native-string-utils";
import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/Bai_Jamjuree/BaiJamjuree-Bold.ttf";
import "./index.scss";
import App from "./pages";
import stores from "./redux";
import "./utils/global-utils";
try {
  setTimeout((_) => {
    const ga4react = new GA4React("G-2ESCWMS432");
    ga4react.initialize().catch((err) => console.error(err));
  }, 4000);
} catch (err) {
  console.error(err);
}
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});
const root = createRoot(document.getElementById("root"));

const Root = () => {
  return (
    <Provider store={stores}>
      <BrowserRouter>
        <I18nextProvider>
          <ScrollToTop />
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  );
};

root.render(<Root />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
