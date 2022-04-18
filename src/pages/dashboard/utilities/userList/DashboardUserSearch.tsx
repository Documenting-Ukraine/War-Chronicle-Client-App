import { isEqual } from "lodash";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../../../store/reducers/asyncActions/fetchUsers";
import useReduxDebouncedSearchInputs from "../../../../hooks/use-redux-debounced-search-inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserSortProps } from "./types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { FetchUserDataProps } from "../../../../store/reducers/asyncActions/fetchUsers";
const DashboardUserSearch = ({
  userType,
  userSort
}: {
    userType: "admin" | "contributor",
    userSort: UserSortProps,
  }) => {
  const dispatch = useDispatch()
  const app = useRealmApp()
  const [searchValue, setSearchValue, addedPayload, setAddedPayload] = useReduxDebouncedSearchInputs({
    addedPayload: {
      user_type: userType,
      order: userSort,
    },
    reduxUpdateFunc: fetchUserData,
  });
  useEffect(() => {
    const newPayload: Omit<FetchUserDataProps["input"], "value"> = {
      user_type: userType,
      order: userSort,
    };
    if (!isEqual(newPayload, addedPayload)) {
      setAddedPayload(newPayload);
      dispatch(
        fetchUserData({
          app: app,
          input: {
            ...newPayload,
            value: searchValue
          },
        })
      );
    }
  }, [userType, userSort, setAddedPayload, dispatch, app, searchValue, addedPayload])

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
