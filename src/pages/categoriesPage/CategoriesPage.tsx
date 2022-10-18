import { useRealmApp } from "../../realm/RealmApp";
import RecentList from "../utilityComponents/recentList/RecentList";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { Link } from "react-router-dom";
import useFetchRecordData from "../../hooks/use-fetch-record-data";
import IntroImage from "../utilityComponents/introImage/IntroImage";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
import { RecordSubmissionType } from "../../types";
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
  const { data: warCrimeData, status: warCrimeStatus } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("War Crimes")),
    pagination: true,
  });
  const { data: refugeesData, status: refugeesStatus } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Refugees And IDPs")),
    pagination: true,
  });
  const { data: internationalData, status: internationalStatus } =
    useFetchRecordData({
      searchQuery: JSON.stringify(searchQuery("International Response")),
      pagination: true,
    });
  const { data: mediaAndDisInfoData, status: mediaAndDisInfoStatus } =
    useFetchRecordData({
      searchQuery: JSON.stringify(searchQuery("Media And Disinformation")),
      pagination: true,
    });
  const { data: protestAbroadData, status: protestAbroadStatus } =
    useFetchRecordData({
      searchQuery: JSON.stringify(searchQuery("Protests Abroad")),
      pagination: true,
    });
  const { data: russianData, status: russianStatus } = useFetchRecordData({
    searchQuery: JSON.stringify(searchQuery("Russia")),
    pagination: true,
  });
  const data: {
    [key: string]: {
      data: RecordSubmissionType[];
      status: "loading" | "failed" | "success";
    };
  } = {
    "War Crimes": { status: warCrimeStatus, data: warCrimeData },
    "Refugees And IDPs": {
      status: refugeesStatus,
      data: refugeesData,
    },
    "Protests Abroad": { status: protestAbroadStatus, data: protestAbroadData },
    "Media And Disinformation": {
      status: mediaAndDisInfoStatus,
      data: mediaAndDisInfoData,
    },
    "International Response": {
      status: internationalStatus,
      data: internationalData,
    },
    Russia: {
      status: russianStatus,
      data: russianData,
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
            overflow: data[category].status === "loading" ? "hidden" : "",
          };
          const bannerStyles: { [key: string]: string } = {
            ...loadingStyles,
            ...dataEmptyStyles,
          };

          return (
            <div key={category} className={`${namespace}-category-list`}>
              <RecentList
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
