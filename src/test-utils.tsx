import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { RealmAppProvider } from "./realm/RealmApp";
const RealmAppId = process.env["REACT_APP_REALM_APP_DEV"];

const customRender = (node:ReactElement, ...options: any[]) => {
  return render(
    <>
      <RealmAppProvider appId={RealmAppId}>
        <Router>{node}</Router>
      </RealmAppProvider>
    </>,
    ...options
  );
};

export * from "@testing-library/react";

export { customRender };
  
