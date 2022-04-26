import { useRealmApp } from "../../../../realm/RealmApp";
import { ScopeRequest } from "../../../../store/reducers/dashboard/reviewRequests/types";

const DashboardScopeRequest = ({
    data
}: {
    data: ScopeRequest
}) => {
    const app = useRealmApp()
    const user = app.currentUser
    return(
        <div>
        </div>
    )
};
export default DashboardScopeRequest;
