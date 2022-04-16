import { isEqual } from "lodash";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../../../store/reducers/asyncActions/fetchUsers";
import useReduxDebouncedSearchInputs from "../../../../hooks/use-redux-debounced-search-inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserSortProps, isName } from "./types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { FetchUserDataProps } from "../../../../store/reducers/asyncActions/fetchUsers";
const DashboardUserSearch = ({
  userType,
  userSort
}: {
    userType: "admins" | "contributors",
    userSort: UserSortProps,
  }) => {
  const dispatch = useDispatch()
  const app = useRealmApp()
  const [searchValue, setSearchValue, addedPayload, setAddedPayload] = useReduxDebouncedSearchInputs({
    addedPayload: {
      userType: userType,
      order: {
        key: isName(userSort) ? "name":"join_date",
        direction: isName(userSort) ? userSort.name : userSort.joined,
      },
    },
    reduxUpdateFunc: fetchUserData,
  });
  useEffect(() => {
    const newPayload: Omit<FetchUserDataProps["input"], "value"> = {
      userType: userType,
      order: {
        key: isName(userSort) ? "name" : "join_date",
        direction: isName(userSort) ? userSort.name : userSort.joined,
      },
    };
    setAddedPayload(newPayload);

    if(!isEqual(newPayload, addedPayload)) dispatch(
      fetchUserData({
        app: app,
        input: {
          ...newPayload,
          value: searchValue
        },
      })
    );
  }, [userType, userSort, setAddedPayload])

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
