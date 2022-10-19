import { useRealmApp } from "../../realm/RealmApp";
import RecentList from "../utilityComponents/recentList/RecentList";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { Link } from "react-router-dom";
import useFetchRecordData from "../../hooks/use-fetch-record-data";
import IntroImage from "../utilityComponents/introImage/IntroImage";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
import { RecordSubmissionType } from "../../types";
import { DebouncedFunc } from "lodash";
const namespace = "categories-pg";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
const searchQuery = (
  category: typeof CategoriesList[number]
): RecordFormSearchQuery => ({
  categories: [category],
  sortBy: "newest_creation_date",
});
const CategoriesPage = () => {
  const app = useRealmApp();
  const {
    data: warCrimeData,
    status: warCrimeStatus,
    debouncedNextPagination: warCrimeNextPagination,
    paginationEnd: warCrimePaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("War Crimes")),
    pagination: true,
  });
  const {
    data: refugeesData,
    status: refugeesStatus,
    debouncedNextPagination: refugeesNextPagination,
    paginationEnd: refugeesPaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Refugees And IDPs")),
    pagination: true,
  });
  const {
    data: internationalData,
    status: internationalStatus,
    debouncedNextPagination: internationalNextPagination,
    paginationEnd: internationalPaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("International Response")),
    pagination: true,
  });
  const {
    data: mediaAndDisInfoData,
    status: mediaAndDisInfoStatus,
    debouncedNextPagination: mediaAndDisNextPagination,
    paginationEnd: mediaAndDisPaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Media And Disinformation")),
    pagination: true,
  });
  const {
    data: protestAbroadData,
    status: protestAbroadStatus,
    debouncedNextPagination: protestAbroadNextPagination,
    paginationEnd: protestsAbroadPaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Protests Abroad")),
    pagination: true,
  });
  const {
    data: russianData,
    status: russianStatus,
    debouncedNextPagination: russiaNextPagination,
    paginationEnd: russiaPaginationEnd,
  } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Russia")),
    pagination: true,
  });
  const data: {
    [key: string]: {
      data: RecordSubmissionType[];
      status: "loading" | "failed" | "success";
      nextPagination?: DebouncedFunc<
        (e: React.UIEvent<HTMLElement, UIEvent>) => Promise<void>
      >;
      paginationEnd?: boolean;
    };
  } = {
    "War Crimes": {
      status: warCrimeStatus,
      data: warCrimeData,
      nextPagination: warCrimeNextPagination,
      paginationEnd: warCrimePaginationEnd,
    },
    "Refugees And IDPs": {
      status: refugeesStatus,
      data: refugeesData,
      nextPagination: refugeesNextPagination,
      paginationEnd: refugeesPaginationEnd,
    },
    "Protests Abroad": {
      status: protestAbroadStatus,
      data: protestAbroadData,
      nextPagination: protestAbroadNextPagination,
      paginationEnd: protestsAbroadPaginationEnd,
    },
    "Media And Disinformation": {
      status: mediaAndDisInfoStatus,
      data: mediaAndDisInfoData,
      nextPagination: mediaAndDisNextPagination,
      paginationEnd: mediaAndDisPaginationEnd,
    },
    "International Response": {
      status: internationalStatus,
      data: internationalData,
      nextPagination: internationalNextPagination,
      paginationEnd: internationalPaginationEnd,
    },
    Russia: {
      status: russianStatus,
      data: russianData,
      nextPagination: russiaNextPagination,
      paginationEnd: russiaPaginationEnd,
    },
  };

  return (
    <div className={namespace}>
      <IntroImage
        heading="Categories"
        imgData={{
          link: `https://${staticDomain}/about-pg/burned-building.jpg`,
          description: "Burned building in Ukraine",
        }}
        backgroundColors={["#093552", "rgb(249, 249, 249)"]}
      />
      <div className={`${namespace}-container`}>
        {CategoriesList.map((category) => {
          const contributeLink = `/dashboard/${
            app?.currentUser?.id
          }/forms/create-new-${category.replace(/ /g, "-").toLowerCase()}`;
          const dataEmpty = data[category].data.length > 0;
          const dataEmptyStyles: { [key: string]: string } = dataEmpty
            ? {
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }
            : {};
          const loadingStyles = {
            overflow:
              data[category].status === "loading" &&
              data[category].data.length <= 0
                ? "hidden"
                : "",
          };
          const bannerStyles: { [key: string]: string } = {
            ...loadingStyles,
            ...dataEmptyStyles,
          };

          return (
            <div key={category} className={`${namespace}-category-list`}>
              <RecentList
                onScrollListener={data[category].nextPagination}
                paginationEnd={data[category].paginationEnd}
                headerText={category}
                loadingState={data[category].status}
                contributionsData={data[category].data}
                contributeNowLink={contributeLink}
                bannerStyles={bannerStyles}
                pagination
              />
              {dataEmpty && (
                <div className={`${namespace}-contribute-link`}>
                  <Link to={contributeLink}>Contribute Now</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoriesPage;
