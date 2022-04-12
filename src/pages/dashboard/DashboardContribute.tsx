
import { useRealmApp } from "../../realm/RealmApp"
import contributeActionCardData from "./staticData/ContributeActionCardData"
import DashboardActionCards from "./utilities/actionCards/DashboardActionCards"
import DashboardRecent from "./utilities/recentBanner/DashboardRecent"
const DashboardContribute = (): JSX.Element => {
    const app = useRealmApp()
    const cardData = app.currentUser ? contributeActionCardData(app.currentUser) : []
    return <>
        <DashboardActionCards cardData={cardData} />
        <DashboardRecent />
    </>;
}
export default DashboardContribute