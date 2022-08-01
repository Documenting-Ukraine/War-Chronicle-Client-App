import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageWrapper from "../utilityComponents/pageWrapper/PageWrapper";
import SearchQuery from "./SearchQuery";

const SearchPage = (): JSX.Element => {
  const namespace = "search-page";
  return (
    <PageWrapper
      heading={"Search Records"}
      icon={<FontAwesomeIcon icon={faSearch} />}
    >
      <>
      <SearchQuery />
      </>
    </PageWrapper>
  );
};
export default SearchPage;
