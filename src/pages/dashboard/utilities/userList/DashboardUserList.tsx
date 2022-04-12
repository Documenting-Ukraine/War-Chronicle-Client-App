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

export const DashboardUserSearch = () => {
  const [searchValue, setSearchValue] = useReduxDebouncedSearchInputs({
    reduxUpdateFunc: fetchUserData
  })
  return (
    <div id="dashboard-user-search">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        value={searchValue}
        onChange={setSearchValue}
      />
    </div>
  );
}
const DashboardUserList = () => {
  const userListData = useSelector(
    (state: RootState) => state.dashboard.userListData
  );
  const userList = userListData.data;
  const dispatch = useDispatch();
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
            <button>Admins</button>
            <button>Contributors</button>
          </div>
          <div className="dashboard-user-count">
            <div>
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
            </div>
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
                  <div>
                    <button onClick={title.sort} data-sort-type={"ascending"}>
                      <FontAwesomeIcon icon={faSortUp} />
                    </button>
                    <button onClick={title.sort} data-sort-type={"descending"}>
                      <FontAwesomeIcon icon={faSortDown} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="dashboard-user-columns">
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
