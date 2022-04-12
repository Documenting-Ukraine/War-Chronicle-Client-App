import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRealmApp } from "../../../realm/RealmApp";
import {Link} from "react-router-dom"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface CardProps {
  additionalRoute: string, 
  cardIcon: IconProp,
  cardHeading: string, 
  cardDescription: string
}
interface DashboardActionProps {
  cardData: CardProps[]
}
const DashboardActionCard = ({
  linkRoute, 
  cardIcon, 
  cardHeading,
  cardDescription
}:Omit<CardProps, "additionalRoute"> & {linkRoute: string}) => (
  <Link
    to={linkRoute}
    className="action-card"
  >
    <div className="action-card-header">
      <FontAwesomeIcon icon={cardIcon} />
      <h2>{cardHeading}</h2>
    </div>
    <p className="action-card-description">
      {cardDescription}
    </p>
  </Link>
);
const DashboardActionCards = ({ cardData }: DashboardActionProps): JSX.Element => {
  const app = useRealmApp()
  return (
    <div className="dashboard-action-cards">
      {cardData.map((card) => (
        <DashboardActionCard
          key={card.cardHeading}
          linkRoute={`/dashboard/${app.currentUser?.id}/${card.additionalRoute}`}
          cardIcon={card.cardIcon}
          cardDescription={card.cardDescription}
          cardHeading = {card.cardHeading}
        />
      ))}
    </div>
  );
};
export default DashboardActionCards;
