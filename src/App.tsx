import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavWrapper from "./pages/utilityComponents/navWrapper/NavWrapper";
import LoadingIcon from "./pages/utilityComponents/loadingIcon/LoadingIcon";
import {
  RequireNonGuestAndOwner,
  RequireNonGuestAccount,
  RequireNoUser,
} from "./pages/utilityComponents/protectedRoute/ProtectedRoute";
const TermsAndConditions = React.lazy(
  () => import("./pages/termsAndConditionsPage/TermsAndConditions")
);
const CategoriesPage = React.lazy(
  () => import("./pages/categoriesPage/CategoriesPage")
);
const FormPage = React.lazy(() => import("./pages/authPage/FormPage"));
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"));
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const DashboardSubpages = React.lazy(
  () => import("./pages/dashboard/subPages/DashboardSubPages")
);

const SearchPage = React.lazy(() => import("./pages/searchPage/SearchPage"));
const RecordFormPage = React.lazy(
  () => import("./pages/recordForms/RecordFormPage")
);
const RecordPage = React.lazy(() => import("./pages/recordPage/RecordPage"));
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
            path="/search/*"
            element={
              <NavWrapper>
                <SearchPage />
              </NavWrapper>
            }
          />
          <Route
            path="/categories/*"
            element={
              <NavWrapper>
                <CategoriesPage />
              </NavWrapper>
            }
          />
          <Route path={"terms/*"} element={<TermsAndConditions />} />
          <Route path="/dashboard/:id">
            <Route
              index
              element={
                <RequireNonGuestAndOwner path="/dashboard">
                  <NavWrapper>
                    <Dashboard type="overview" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            />
            <Route
              path="overview"
              element={
                <RequireNonGuestAndOwner path="/dashboard">
                  <NavWrapper>
                    <Dashboard type="overview" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            />
            <Route
              path="contribute"
              element={
                <RequireNonGuestAndOwner path="/dashboard">
                  <NavWrapper>
                    <Dashboard type="contribute" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            />
            <Route path="manage">
              <Route
                index
                element={
                  <RequireNonGuestAndOwner path="/dashboard">
                    <NavWrapper>
                      <Dashboard type="manage" />
                    </NavWrapper>
                  </RequireNonGuestAndOwner>
                }
              />
              <Route path="review-requests">
                <Route
                  index
                  element={
                    <RequireNonGuestAndOwner path="/dashboard">
                      <NavWrapper>
                        <DashboardSubpages subPageType="review-users" />
                      </NavWrapper>
                    </RequireNonGuestAndOwner>
                  }
                />
                <Route
                  path="new-scopes"
                  element={
                    <RequireNonGuestAndOwner path="/dashboard">
                      <NavWrapper>
                        <DashboardSubpages subPageType="review-scopes" />
                      </NavWrapper>
                    </RequireNonGuestAndOwner>
                  }
                />
                <Route
                  path="new-users"
                  element={
                    <RequireNonGuestAndOwner path="/dashboard">
                      <NavWrapper>
                        <DashboardSubpages subPageType="review-users" />
                      </NavWrapper>
                    </RequireNonGuestAndOwner>
                  }
                />
              </Route>
            </Route>
            <Route
              path="all-contributions"
              element={
                <RequireNonGuestAndOwner path="/dashboard">
                  <NavWrapper>
                    <DashboardSubpages subPageType="user-contributions" />
                  </NavWrapper>
                </RequireNonGuestAndOwner>
              }
            />
            <Route
              path="forms/*"
              element={
                <RequireNonGuestAccount>
                  <NavWrapper>
                    <RecordFormPage />
                  </NavWrapper>
                </RequireNonGuestAccount>
              }
            ></Route>
          </Route>

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
          <Route path="records/*">
            <Route index element={<Navigate to={"/search"}></Navigate>} />
            <Route
              path=":recordType/:id"
              element={
                <NavWrapper>
                  <RecordPage />
                </NavWrapper>
              }
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
