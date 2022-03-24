import React from "react";
import { Routes, Route } from "react-router-dom";
const SearchPage = React.lazy(
  () => import("../../pages/searchPage/SearchPage")
);

const SearchRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path=":id" element={<SearchPage />}></Route>
    </Routes>
  );
};
export default SearchRoutes;
