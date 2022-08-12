import AboutSummary from "./AboutSummary";
import AboutContributors from "./AboutContributors";
import AboutExplore from "./AboutExplore";
const AboutPage = (): JSX.Element => {
  const namespace = "about-pg";
  return (
    <div id={`${namespace}-container`}>
      <div id={`${namespace}-inner`}>
        <AboutSummary />
        <AboutContributors />
        <AboutExplore />
      </div>
    </div>
  );
};
export default AboutPage;
