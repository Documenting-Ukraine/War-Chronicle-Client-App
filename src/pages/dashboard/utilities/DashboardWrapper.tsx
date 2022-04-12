import DashboardHeader from "./header/DashboardHeader";
import { useRealmApp } from "../../../realm/RealmApp";
const DashboardWrapper = ({children}: {children: JSX.Element}): JSX.Element => {
    const app = useRealmApp();
    const accountType = app.currentUser?.customData?.account_type;
    return (
      <div id="dashboard-pg-container">
        <div id="dashboard-pg-inner">
          {(accountType === "admin" || accountType === "contributor")  && (
            <>
              <DashboardHeader accountType={accountType} />
            </>
                )}
                {children}
        </div>
      </div>
    );
}
export default DashboardWrapper