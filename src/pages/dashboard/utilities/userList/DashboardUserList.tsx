import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardUser from "./DashboardUser";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faSortDown,
  faSortUp
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../../../store/reducers/asyncActions/fetchUsers";
import useReduxDebouncedSearchInputs from "../../../../hooks/use-redux-debounced-search-inputs";
import { useState } from "react";
import { number } from "prop-types";

export const DashboardUserSearch = () => {
  const [searchValue, setSearchValue] = useReduxDebouncedSearchInputs({
    reduxUpdateFunc: fetchUserData
  })
  return (
    <div id="dashboard-user-search" tabIndex={0}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input value={searchValue} onChange={setSearchValue} placeholder={"Search by name or email"}/>
    </div>
  );
}
const DashboardUserList = () => {
  const userListData = useSelector(
    (state: RootState) => state.dashboard.userListData
  );
  const userList = userListData.data;
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<"admins" | "contributors">("admins")
  const onUserType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.dataset.userType
    const map = ["admins", "contributors"] as const
    if(target && (target === map[0] || target === map[1])) setUserType(target)
  };
  const columnTitlesData = [
    { title: "Name", sort: () => null },
    { title: "Email" },
    { title: "Joined", sort: () => null },
    { title: "Actions" },
  ];
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
                  ? userList.length >= 50
                    ? "1-50"
                    : `1-${userList.length}`
                  : "0"
              } of ${
                userList
                  ? userList.length >= 500
                    ? `500 or more`
                    : userList.length
                  : "0"
              }`}
            </p>
            <button>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="dashboard-user-columns">
          {columnTitlesData.map((title) => {
            return (
              <div key={title.title} className={"dashboard-user-column-title"}>
                <h5>{title.title}</h5>
                {title.sort && (
                  <div className="sorting-pointers">
                    <button onClick={title.sort} data-sort-type={"ascending"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 321 193"
                      >
                        <path
                          d="M27.6601 192.027H292.36C316.96 192.027 329.25 162.247 311.9 144.907L179.6 8.107C174.194 2.701 167.13 0 160.07 0C153.015 0 145.98 2.701 140.62 8.107L8.11914 144.927C-9.22886 162.227 3.05514 192.027 27.6601 192.027Z"
                        />
                      </svg>
                    </button>
                    <button onClick={title.sort} data-sort-type={"descending"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 192"
                      >
                        <path
                          d="M311.897 47.1L179.497 183.9C174.097 189.3 167.097 192 159.997 192C152.942 192 145.877 189.298 140.527 183.891L8.12673 47.091C-9.23227 29.8 3.05173 0 27.6567 0H292.357C316.897 0 329.197 29.8 311.897 47.1Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="dashboard-users">
          {userList &&
            userList.map((user) => (
              <DashboardUser key={user._id} user={user} />
            ))}
        </div>
      </div>
    </>
  );
};
export default DashboardUserList;
