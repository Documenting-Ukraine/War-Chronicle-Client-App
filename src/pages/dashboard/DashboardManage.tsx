import manageActionCard from "./staticData/ManageActionCard"
import DashboardActionCards from "./utilities/actionCards/DashboardActionCards"
import DashboardUserList from "./utilities/userList/DashboardUserList"
const DashboardManage = () => {
    const cardData = manageActionCard()
    return (
      <>
        <DashboardActionCards cardData={cardData} />
        <DashboardUserList />
     </>
    );
}
export default DashboardManage