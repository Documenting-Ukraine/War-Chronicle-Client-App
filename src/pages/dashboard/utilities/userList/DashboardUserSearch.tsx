import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../../../store/reducers/asyncActions/fetchUsers";
import useReduxDebouncedSearchInputs from "../../../../hooks/use-redux-debounced-search-inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardUserSearch = () => {
  const [searchValue, setSearchValue] = useReduxDebouncedSearchInputs({
    reduxUpdateFunc: fetchUserData,
  });
  return (
    <div id="dashboard-user-search" tabIndex={0}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        value={searchValue}
        onChange={setSearchValue}
        placeholder={"Search users by name or email"}
      />
    </div>
  );
};
export default DashboardUserSearch;
