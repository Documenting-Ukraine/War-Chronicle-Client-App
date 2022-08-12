import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBookAtlas,
  faFileContract,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const cardData = [
  {
    title: "Search",
    link: "/search",
    description: "Search our archive for records",
    icon: faSearch,
  },
  {
    title: "Categories",
    link: "/categories",
    description: "Look through records by category",
    icon: faBookAtlas,
  },
  {
    title: "Terms",
    link: "/terms",
    description: "Read our terms of service",
    icon: faFileContract,
  },
];
const ExploreCard = ({
  title,
  link,
  description,
  icon,
}: {
  title: string;
  link: string;
  description: string;
  icon: IconProp;
}) => {
  const namespace = "explore-card";
  return (
    <div className={`${namespace}-container`}>
      <Link to={link} className={`${namespace}`}>
        <div className={`${namespace}-img`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={`${namespace}-content`}>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};
const AboutExplore = () => {
  const namespace = "about-pg";
  return (
    <div id={`${namespace}-explore-more`}>
      {cardData.map((el) => (
        <ExploreCard
          key={el.title}
          icon={el.icon}
          title={el.title}
          link={el.link}
          description={el.description}
        />
      ))}
    </div>
  );
};
export default AboutExplore;
