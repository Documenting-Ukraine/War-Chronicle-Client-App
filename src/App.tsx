import React,{ Suspense } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import NavWrapper from "./pages/utilityComponents/navWrapper/NavWrapper"
import LoadingIcon from "./pages/utilityComponents/loadingIcon/LoadingIcon"
const HomePage = React.lazy(() => import("./pages/homePage/HomePage"))
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"))
const SearchRoutes = React.lazy(() => import("./routes/searchRoutes/SearchRoutes"))
const DashboardRoutes = React.lazy(() => import("./routes/dashboardRoutes/DashboardRoutes"))

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<LoadingIcon />}>
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
              path="/dashboard/*"
              element={
                <NavWrapper>
                  <DashboardRoutes />
                </NavWrapper>
              }
            />
            <Route
              path="/search/*"
              element={
                <NavWrapper>
                  <SearchRoutes />
                </NavWrapper>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
