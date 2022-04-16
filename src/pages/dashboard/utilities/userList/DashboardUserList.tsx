import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { useState } from "react";
import useWindowWidth from "../../../../hooks/use-window-width";
import DashboardUserColumn from "./DashboardUserColumn";
import DashboardUserSearch from "./DashboardUserSearch";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFaceFrownOpen,
} from "@fortawesome/free-solid-svg-icons";
import { isName, isJoin, UserSortProps } from "./types";
import { fetchUserData } from "../../../../store/reducers/asyncActions/fetchUsers";
import { useRealmApp } from "../../../../realm/RealmApp";

const DashboardUserList = () => {
  const userListData = useSelector(
    (state: RootState) => state.dashboard.userListData
  );
  const smallWidth = useWindowWidth(575);
  const userList = userListData.data ? userListData.data : [];
  const userListLoading = userListData.status;
const app = useRealmApp()
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<"admins" | "contributors">("admins");
  const [userSort, setUserSort] = useState<UserSortProps>({
    joined: "ascending",
  });
  const [userListPage, setUserListPage] = useState(0);
  const onUserType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.dataset.userType;
    const map = ["admins", "contributors"] as const;
    if (target && (target === map[0] || target === map[1])) setUserType(target)
  };
  const onSortOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = e.currentTarget.dataset;
    const direction = data.direction;
    const column = data.column;
    if (typeof column !== "string") return;
    const newState = { [column]: direction };
    if (isName(newState) || isJoin(newState)) setUserSort(newState);
  };
  const onUserPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = e.currentTarget.dataset
    switch (data.actionType) {
      case "prev-pg":
        setUserListPage((state) => (state - 1 >= 0 ? state - 1 : 0));      
        break
      case "next-pg":
        setUserListPage((state) =>
          !userListData.paginationEnd ? state + 1 : state
        );
        if (!userListData.paginationEnd) {
          dispatch(
            fetchUserData({
              app: app,
              input: {
                value: userListData.prevSearch,
                order: {
                  key: isName(userSort) ? "name" : "join_date",
                  direction: isName(userSort) ? userSort.name : userSort.joined
                },
                idIdx: userList[userList.length]._id
              }
            })
          )
        }
        break
      default:
        break
    }
  }
  const columnTitlesData: {
    title: string;
    sort?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    columnType: "avatar" | "email" | "date" | "actionBtn";
  }[] = [
    { title: "Name", sort: onSortOrder, columnType: "avatar" },
    { title: "Email", columnType: "email" },
    { title: "Joined", sort: onSortOrder, columnType: "date" },
    { title: "Actions", columnType: "actionBtn" },
  ];
  if (!smallWidth) columnTitlesData.splice(1, 2);
  const userListStart = userListPage * 50;
  const userListEnd = (userListPage + 1) * 50;
  return (
    <>
      <DashboardUserSearch userType={userType} userSort={userSort} />
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
                userList && userList.length > 0
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
              data-action-type = "prev-pg"
              onClick={onUserPagination}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              data-action-type = "next-pg"
              onClick={onUserPagination}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="dashboard-user-columns">
          {userListLoading === "loading" && (
            <div className="dashboard-user-column-loading">
              <LoadingIcon width={"3.5rem"} />
            </div>
          )}
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
                userSort={userSort}
              />
            );
          })}
          {(!userList || userList.length === 0) && (
            <div className="dashboard-user-column-placeholder">
              <div><FontAwesomeIcon icon={faFaceFrownOpen}/></div>
              <h4>No users found</h4>
              <p>We can't find any items matching your search, or there are no users in the project</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DashboardUserList;
