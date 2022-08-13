import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecordForms } from "../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { useRealmApp } from "../../realm/RealmApp";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import FormInputs from "../utilityComponents/formInputs/FormInputs";
import { isOption, transformSingleList } from "../authPage/data/OccupationList";
import { SearchDateList } from "./SearchDateList";
type DateInterval = {
  startDate: Date | string;
  endDate: Date | string;
};
const MediaOptionTypes = ["Yes", "No", "Does not matter"];
const categoriesOption = transformSingleList([...CategoriesList]);
const mediaOptions = transformSingleList(MediaOptionTypes);
const SearchQuery = () => {
  const namespace = "search-page";
  const app = useRealmApp();
  const dispatch = useDispatch();
  const [advancedSearch, setAdvancedSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dateQuery, setDateQuery] = useState<RecordFormSearchQuery["date"]>();
  const [containsMedia, setContainsMedia] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<string[]>([...CategoriesList]);
  const onSearch = () => {
    const searchQuery: RecordFormSearchQuery = {
      value: searchValue,
      categories: categories,
      containsMedia: containsMedia,
      date: dateQuery,
    };
    dispatch(
      fetchRecordForms({
        app: app,
        input: {
          searchQuery: searchQuery,
        },
      })
    );
  };
  const onSearchQueryChange = (e: { [key: string]: DateInterval }) => {
    setDateQuery({
      eventDate: e["Datebase Creation Date"],
      recordCreation: e["Event/Published Date"],
    });
  };
  const onSearchQueryCallback = useCallback(
    (e: { [key: string]: DateInterval }) => onSearchQueryChange(e),
    []
  );
  return (
    <>
      <div className={`${namespace}-query-container`}>
        <div className={`${namespace}-query`}>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder={"Search"}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) onSearch();
              else if (e.key === "Enter") e.preventDefault();
            }}
          />
          <button onClick={onSearch} aria-label={"perform-search"}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <button
          id={"advanced-search-btn"}
          onClick={() => setAdvancedSearch((state) => !state)}
          aria-label={`${
            !advancedSearch ? "show-more-options" : "hide-options"
          }`}
        >
          {!advancedSearch ? "Advanced" : "Hide Options"}
        </button>
      </div>
      {advancedSearch && (
        <div className={`${namespace}-advanced-search-container`}>
          <h3>Matches all the following rules:</h3>
          <h4>Record Types</h4>
          <FormInputs
            name={"Record Types"}
            title={" "}
            customDropdownFunc={(e) => {
              if (e && !isOption(e)) {
                setCategories(e.map((el) => el.value));
              }
            }}
            defaultMultiDropDownValue={categoriesOption}
            required={false}
            isDropdownMulti
            dropDown={categoriesOption}
          />
          <div className={`${namespace}-media-query`}>
            <h4>Contains Media?</h4>
            <FormInputs
              required={false}
              title={" "}
              name={"Media Query"}
              dropDown={mediaOptions}
              defaultDropDownValue={mediaOptions[2]}
              customDropdownFunc={(e) => {
                if (isOption(e)) {
                  switch (e.value) {
                    case "Yes":
                      setContainsMedia(true);
                      break;
                    case "No":
                      setContainsMedia(false);
                      break;
                    default:
                      setContainsMedia(null);
                  }
                }
              }}
            />
          </div>
          <SearchDateList onChange={onSearchQueryCallback} />
        </div>
      )}
    </>
  );
};
export default SearchQuery;
