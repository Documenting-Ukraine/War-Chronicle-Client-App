
import { useRealmApp } from "../../realm/RealmApp"
import contributeActionCardData from "./staticData/ContributeActionCardData"
import DashboardActionCards from "./utilities/DashboardActionCards"
const DashboardContribute = (): JSX.Element => {
    const app = useRealmApp()
    const cardData = app.currentUser ? contributeActionCardData(app.currentUser) : []
    return <>
        <DashboardActionCards cardData={cardData} />
    </>;
}
export default DashboardContribute