import { createContext, useContext } from "react"
import fetchGridActivityData from "./fetchGridActivityData";
import fetchContributions from "./fetchRecentContributions";
export interface ActivityDataTemplate {
  [key: string]: number;
}
const DashboardDataContext = createContext({
    pastYearActivity: {},
    recentContributions: {},
    fetchContributionData: () => {}, 
    fetchActivityData: () => {},
})
export const useDashboardData = () => {
    const data = useContext(DashboardDataContext);
    return data
};
const DashboardData = ({ children }: { children: JSX.Element }) => {
    
    const data = {
        pastYearActivity: {},
        recentContributions: {},
        fetchContributionData: fetchContributions,
        fetchActivityData: fetchGridActivityData
    }
    return <DashboardDataContext.Provider value={data}>
        {children}        
    </DashboardDataContext.Provider>
}
export default DashboardData