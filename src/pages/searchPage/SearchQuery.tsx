import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchQuery = () => {
  const dispatch = useDispatch();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const namespace = "search-page";
  const onSearch = () => {};
  return (
    <div className={`${namespace}-query-container`}>
      <div className={`${namespace}-query`} tabIndex={0}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder={"Search"}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) onSearch();
            else if (e.key === "Enter") e.preventDefault();
          }}
        />
        <button onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <button onClick={(state) => setAdvancedSearch(!state)}>
        {!advancedSearch ? "Advanced Search" : "Hide Options"}
      </button>
      {}
    </div>
  );
};
export default SearchQuery;
