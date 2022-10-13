import { useRealmApp } from "../../realm/RealmApp";
import RecentList from "../utilityComponents/recentList/RecentList";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { Link } from "react-router-dom";
import useFetchRecordData from "../../hooks/use-fetch-record-data";
import IntroImage from "../utilityComponents/introImage/IntroImage";
const namespace = "categories-pg";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
const CategoriesPage = () => {
  const app = useRealmApp();
  const { data, status } = useFetchRecordData();
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
          const dataEmpty = data[category].length > 0;
          const dataEmptyStyles: { [key: string]: string } = dataEmpty
            ? {
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }
            : {};
          const loadingStyles = {
            overflow: status === "loading" ? "hidden" : "",
          };
          const bannerStyles: { [key: string]: string } = {
            ...loadingStyles,
            ...dataEmptyStyles,
          };

          return (
            <div key={category} className={`${namespace}-category-list`}>
              <RecentList
                headerText={category}
                loadingState={status}
                contributionsData={data[category]}
                contributeNowLink={contributeLink}
                bannerStyles={bannerStyles}
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
