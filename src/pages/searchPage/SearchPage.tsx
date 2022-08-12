import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchQuery from "./SearchQuery";
import ParticlesBackground from "../utilityComponents/particleBackground/ParticleBackground";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useEffect } from "react";
import { clearSearchData } from "../../store/reducers/recordForms/recordFormSearch/recordFormsSearchReducer";
import RecordItem from "../utilityComponents/recordItem/RecordItem";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
const SearchPage = (): JSX.Element => {
  const recordsData = useSelector(
    (state: RootState) => state.recordForms.search.searched_data
  );
  const dispatch = useDispatch();
  //on page mount clear store data to refresh
  useEffect(() => {
    dispatch(clearSearchData({}));
  }, []);
  const namespace = "search-page";
  return (
    <>
      <div className={`${namespace}`}>
        <div className={`${namespace}-container`}>
          <ParticlesBackground>
            <>
              <div className={`${namespace}-header`}>
                {<FontAwesomeIcon icon={faSearch} />}
                <h1>Search Records</h1>
              </div>
              <SearchQuery />
            </>
          </ParticlesBackground>  
          <div className={`${namespace}-records-container`}>
            {recordsData.data.length <= 0 && (
              <div className={`${namespace}-no-records-found`}>
                <div>
                  <FontAwesomeIcon icon={faFaceFrownOpen} />
                </div>
                <h4>No records found</h4>
                <p>
                  We can't find any records matching your search. Try searching with broader rules
                </p>
              </div>
            )}
            {recordsData.data.map((record) => (
              <RecordItem
                key={record._id}
                id={record._id}
                title={record.record_title}
                description={record.description}
                creationDate={record.record_creation_date}
                recordType={record.record_type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchPage;
