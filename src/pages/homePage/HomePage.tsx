import IntroBanner from "./IntroBanner";
import RecentSubmissions from "./RecentSubmissions";
const HomePage = ():JSX.Element => {
  const namespace = 'home-page'
  return <div className={`${namespace}-container`}>
    <IntroBanner namespace = {namespace} />
    <RecentSubmissions namespace={namespace} />
  </div>;
};
export default HomePage;
