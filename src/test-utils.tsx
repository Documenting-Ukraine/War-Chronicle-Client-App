import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { RealmAppProvider } from "./realm/RealmApp";
import { Provider } from "react-redux";
import { store } from "./store/store";
const RealmAppId = process.env["REACT_APP_REALM_APP_DEV"];

const customRender = (node: ReactElement, ...options: any[]) => {
  return render(
    <>
      <RealmAppProvider appId={RealmAppId}>
        <Provider store={store}>
          <Router>{node}</Router>
        </Provider>
      </RealmAppProvider>
    </>,
    ...options
  );
};

export * from "@testing-library/react";

export { customRender };
