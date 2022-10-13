import IntroImage from "../utilityComponents/introImage/IntroImage";

const content =
  "The Archive of Aggression is an academic resource for the Russian Invasion of Ukraine. The project began immediately after the large-scale Russian invasion of Ukraine on February 24th, 2022. Though many of the scholars who contributed to the Archive of Aggression agree that Russian military operations in Ukraine began prior to this date, it will be used as the focal point of the archive, which aims to log the unlawful and immoral actions committed by the Russian state as well as detail the global shift in the economics and politics resulting from the invasion.";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;

const AboutSummary = () => {
  return (
    <IntroImage
      heading="About Us"
      imgData={{
        link: `https://${staticDomain}/about-pg/burned-building.jpg`,
        description: "Burned building in Ukraine",
      }}
      backgroundColors={["#093552", "rgb(238, 238, 238)"]}
    >
      {content}
    </IntroImage>
  );
};
  // return (
  //   <>
  //     <div id={`${namespace}-about-us`}>
  //       <h2 id={`${namespace}-about-header`}>About Us</h2>
  //       <div id={`${namespace}-about-img`}>
  //         <img
  //           src={`https://${staticDomain}/about-pg/burned-building.jpg`}
  //           alt="Burned building in Ukraine"
  //         />
  //       </div>
  //       <div id={`${namespace}-about-summary`}>
  //         <p>{content}</p>
  //       </div>
  //     </div>
  //   </>
  // );
export default AboutSummary;
