import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,

} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UserDocument } from "../../../../store/reducers/types";
import useWindowWidth from "../../../../hooks/use-window-width";
import DashboardUserColumn from "./DashboardUserColumn";
import DashboardUserSearch from "./DashboardUserSearch";
const DashboardUserList = () => {
  const userListData = useSelector(
    (state: RootState) => state.dashboard.userListData
  );
  const smallWidth = useWindowWidth(575)
  //const userList = userListData.data;
  let userList: UserDocument[] = []
  for (let i = 0; i < 10; i++){
    const userDoc:UserDocument = {
      _id: i.toString(),
      occupation: "teacher",
      first_name: "Arky",
      last_name: "Asmal",
      email: "arkyasmal@gmail.com",
      email_verified: true,
      creation_date: new Date(),
      account_type: "admin",
      external_id: i.toString(),
      user_id: i.toString(),
    }
    userList.push(userDoc)
  }
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<"admins" | "contributors">("admins")
  const [userListPage, setUserListPage] = useState(0)
  const onUserType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.dataset.userType
    const map = ["admins", "contributors"] as const
    if(target && (target === map[0] || target === map[1])) setUserType(target)
  };
  const columnTitlesData: {
    title: string;
    sort?: () => null;
    columnType: "avatar" | "email" | "date" | "actionBtn";
  }[] = [
    { title: "Name", sort: () => null, columnType: "avatar" },
    { title: "Email", columnType: "email" },
    { title: "Joined", sort: () => null, columnType: "date" },
    { title: "Actions", columnType: "actionBtn" },
    ];
  if(!smallWidth) columnTitlesData.splice(1,2)
  const userListStart = userListPage * 50;
  const userListEnd = (userListPage + 1) * 50
  return (
    <>
      <DashboardUserSearch />
      <div id="dashboard-user-list">
        <div className="dashboard-user-nav">
          <div className="dashboard-user-type">
            <button
              className={`${userType === "admins" ? "selected" : ""}`}
              onClick={onUserType}
              data-user-type="admins"
            >
              Admins
            </button>
            <button
              className={`${userType === "contributors" ? "selected" : ""}`}
              onClick={onUserType}
              data-user-type="contributors"
            >
              Contributors
            </button>
          </div>
          <div className="dashboard-user-count">
            <p className="user-count">
              {`${
                userList
                  ? (userListPage + 1) * 50 <= userList.length
                    ? `${userListStart + 1}-${userListEnd}`
                    : `${userListStart + 1}-${userList.length}`
                  : "0"
              } of ${
                userList
                  ? userList.length >= 500
                    ? `500 or more`
                    : userList.length
                  : "0"
              }`}
            </p>
            <button
              onClick={() =>
                setUserListPage((state) => (state - 1 >= 0 ? state - 1 : 0))
              }
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={() =>
                setUserListPage((state) =>
                  (state + 1) * 50 < userList.length ? state + 1 : state
                )
              }
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="dashboard-user-columns">
          {columnTitlesData.map((title) => {
            return (
              <DashboardUserColumn
                key={title.title}
                title={title.title}
                sort={title.sort}
                userListEnd={userListEnd}
                userListStart={userListStart}
                userList={userList}
                columnType={title.columnType}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default DashboardUserList;
