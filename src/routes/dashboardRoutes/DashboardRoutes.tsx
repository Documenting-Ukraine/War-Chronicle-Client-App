import React from "react";
import { Routes, Route } from "react-router-dom"
const Dashboard = React.lazy(() => import("../../pages/dashboard/Dashboard"));

const DashboardRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path=":id" element={<Dashboard />}></Route>
        </Routes>
    )
}
export default DashboardRoutes