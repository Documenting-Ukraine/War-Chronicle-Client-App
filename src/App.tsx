import React, { Suspense } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavWrapper from "./pages/utilityComponents/navWrapper/NavWrapper";
import LoadingIcon from "./pages/utilityComponents/loadingIcon/LoadingIcon";
import { RealmAppProvider } from "./realm/RealmApp";
import {
  // RequireStrictAuth,
  // RequireNonGuestAccount,
  RequireAuth,
  RequireNonGuestAndOwner,
  RequireNoUser
} from "./pages/utilityComponents/protectedRoute/ProtectedRoute";
const FormPage = React.lazy(() => import("./pages/formPage/FormPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
const SearchRoutes = React.lazy(
  () => import("./routes/searchRoutes/SearchRoutes")
);
const DashboardRoutes = React.lazy(
  () => import("./routes/dashboardRoutes/DashboardRoutes")
);
const RealmAppId = process.env["REACT_APP_REALM_APP_DEV"];

function App() {
  return (
        <div className="App">
          <Suspense fallback={<LoadingIcon entireViewPort={true} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <NavWrapper>
                    <HomePage />
                  </NavWrapper>
                }
              />
              <Route
                path="/about/*"
                element={
                  <NavWrapper>
                    <AboutPage />
                  </NavWrapper>
                }
              />
              <Route
                path="/dashboard/:id/*"
                element={
                  <RequireNonGuestAndOwner path="dashboard">
                    <NavWrapper>
                      <DashboardRoutes />
                    </NavWrapper>
                  </RequireNonGuestAndOwner>
                }
              ></Route>

              <Route
                path="/search/*"
                element={
                  <RequireAuth>
                    <NavWrapper>
                      <SearchRoutes />
                    </NavWrapper>
                  </RequireAuth>
                }
              ></Route>

              <Route path="/forms/*">
                <Route
                  path="login"
                  element={
                    <RequireNoUser>
                      <NavWrapper>
                        <FormPage formType={"login"} />
                      </NavWrapper>
                    </RequireNoUser>
                  }
                />
                <Route
                  path="invite-links/:id"
                  element={
                    <RequireNoUser allowGuest={true}>
                      <NavWrapper>
                        <FormPage formType={"invite-links"} />
                      </NavWrapper>
                    </RequireNoUser>
                  }
                />
                <Route
                  path="join"
                  element={
                    <RequireNoUser allowGuest={true}>
                      <NavWrapper>
                        <FormPage formType={"join"} />
                      </NavWrapper>
                    </RequireNoUser>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </div>
  );
}

export default App;
