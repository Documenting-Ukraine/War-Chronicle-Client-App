import React, { Suspense } from "react";
import {Routes, Route } from "react-router-dom";
import NavWrapper from "./pages/utilityComponents/navWrapper/NavWrapper";
import LoadingIcon from "./pages/utilityComponents/loadingIcon/LoadingIcon";
import {
  RequireAuth,
  RequireNonGuestAndOwner,
  RequireNoUser
} from "./pages/utilityComponents/protectedRoute/ProtectedRoute";
import RequestNewScopesModal from "./pages/dashboard/utilities/modals/RequestUserScope";
const FormPage = React.lazy(() => import("./pages/formPage/FormPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
// const SearchRoutes = React.lazy(
//   () => import("./routes/searchRoutes/SearchRoutes")
// );

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"))


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
          <Route path="/dashboard/:id">
            <Route
              index={true}
              element={
                <RequireNonGuestAndOwner path="dashboard">
                  <NavWrapper>
                    <Dashboard type="overview" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            ></Route>
            <Route
              path="overview"
              element={
                <RequireNonGuestAndOwner path="dashboard">
                  <NavWrapper>
                    <Dashboard type="overview" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            ></Route>
            <Route
              path="contribute"
              element={
                <RequireNonGuestAndOwner path="dashboard">
                  <NavWrapper>
                    <Dashboard type="contribute" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            ></Route>
            <Route
              path="manage"
              element={
                <RequireNonGuestAndOwner path="dashboard">
                  <NavWrapper>
                    <Dashboard type="manage" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            ></Route>
          </Route>

          {/* <Route
            path="/search/*"
            element={
              <RequireAuth>
                <NavWrapper>
                  <SearchRoutes />
                </NavWrapper>
              </RequireAuth>
            }
          ></Route> */}

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
          <Route path="request-access-modal" element={<RequestNewScopesModal />}/>

        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
