import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { useEffect, useState } from "react";
import useWindowWidth from "../../../../hooks/use-window-width";
import DashboardUserColumn from "./DashboardUserColumn";
import DashboardUserSearch from "./DashboardUserSearch";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFaceFrownOpen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { isUserSortOrder, UserSortProps } from "./types";
import { fetchUserData } from "../../../../store/reducers/asyncActions/userActions/fetchUsers";
import { useRealmApp } from "../../../../realm/RealmApp";
import { memo } from "react";
const DashboardUserList = () => {
  const userListData = useSelector(
    (state: RootState) => state.dashboard.userListData
  );
  const smallWidth = useWindowWidth(575);
  const userList = userListData.data ? userListData.data : [];
  const userListStatus = userListData.status;
  const app = useRealmApp();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<"admin" | "contributor">("admin");
  const [userSort, setUserSort] = useState<UserSortProps | undefined>(
    undefined
  );
  const [userListPage, setUserListPage] = useState(0);
  const userListStart = userListPage * 10;
  const userListEnd = (userListPage + 1) * 10;
  //on mount
  useEffect(() => {
    dispatch(
      fetchUserData({
        app: app,
        input: {
          user_type: "admin",
          value: "",
          order: undefined,
        },
      })
    );
  }, [dispatch, app]);
  //if previous search, or sorting/user type categories change
  // pagination number should reset
  useEffect(() => {
    setUserListPage(0);
  }, [userType, userSort, userListData.prev_search]);
  const onUserType = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userListStatus === "loading") return;
    const target = e.currentTarget.dataset.userType;
    const map = ["admin", "contributor"] as const;
    if (target && (target === map[0] || target === map[1])) setUserType(target);
  };
  const onSortOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userListStatus === "loading") return;
    const data = e.currentTarget.dataset;
    const direction = data.direction;
    const column = data.column;
    if (typeof column !== "string") return;
    const newState = {
      key: column,
      direction: direction,
    };
    //same btn, that is already set in state
    if (
      userSort &&
      userSort.key === newState.key &&
      userSort.direction === newState.direction
    ) {
      return setUserSort(undefined);
    }
    if (isUserSortOrder(newState)) return setUserSort(newState);
  };
  const onUserPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userListStatus === "loading") return;
    const data = e.currentTarget.dataset;
    switch (data.actionType) {
      case "prev-pg":
        setUserListPage((state) => (state - 1 >= 0 ? state - 1 : 0));
        break;
      case "next-pg":
        setUserListPage((state) =>
          userListData.pagination_end && userList.length <= userListEnd
            ? state
            : state + 1
        );
        if (!userListData.pagination_end && userList.length === userListEnd) {
          dispatch(
            fetchUserData({
              app: app,
              input: {
                user_type: userType,
                value: userListData.prev_search,
                order: userSort,
                idx_counter: (userListPage + 1) / 5,
              },
            })
          );
        }
        break;
      default:
        break;
    }
  };
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
  return (
    <>
      <div id="dashboard-user-search-row">
        <DashboardUserSearch userType={userType} userSort={userSort} />
        <button className="dashboard-user-add-user-btn">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add User</span>
        </button>
      </div>
      {userListStatus === "failed" && (
        <div className={`dashboard-user-search-alert`}>
          Something went wrong. Please try again later, or contact
          {" " + process.env.REACT_APP_SUPPORT_EMAIL}
        </div>
      )}
      <div id="dashboard-user-list">
        <div className="dashboard-user-nav">
          <div className="dashboard-user-type">
            <button
              className={`${userType === "admin" ? "selected" : ""}`}
              onClick={onUserType}
              data-user-type="admin"
            >
              Admins
            </button>
            <button
              className={`${userType === "contributor" ? "selected" : ""}`}
              onClick={onUserType}
              data-user-type="contributor"
            >
              Contributors
            </button>
          </div>
          <div className="dashboard-user-count">
            {smallWidth && (
              <p className="user-count">
                {userListStatus !== "loading"
                  ? `${
                      userList && userList.length > 0
                        ? (userListPage + 1) * 10 <= userList.length
                          ? `${userListStart + 1}-${userListEnd}`
                          : `${userListStart + 1}-${userList.length}`
                        : "0"
                    } of ${
                      userList
                        ? userList.length - userListStart >= 10 &&
                          !userListData.pagination_end
                          ? "many"
                          : userList.length
                        : "0"
                    }`
                  : `${userListStart + 1}-${userListEnd} of many`}
              </p>
            )}

            <button data-action-type="prev-pg" onClick={onUserPagination}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button data-action-type="next-pg" onClick={onUserPagination}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="dashboard-user-columns">
          {userListStatus === "loading" && (
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
          {(!userList || userList.length === 0) &&
            userListStatus !== "loading" && (
              <div className="dashboard-user-column-placeholder">
                <div>
                  <FontAwesomeIcon icon={faFaceFrownOpen} />
                </div>
                <h4>No users found</h4>
                <p>
                  We can't find any items matching your search, or there are no
                  users in the project
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
};
export default memo(DashboardUserList);
