import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRealmApp } from "../../../../realm/RealmApp";
import {Link} from "react-router-dom"
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface CardProps {
  additionalRoute: string, 
  cardIcon: IconProp,
  cardHeading: string, 
  cardDescription: string,
  isBtn?: () => void
}
interface DashboardActionProps {
  cardData: CardProps[]
}
const DashboardActionCard = ({
  linkRoute, 
  cardIcon, 
  cardHeading,
  cardDescription, 
  isBtn
}:Omit<CardProps, "additionalRoute"> & {linkRoute: string}) => {
  const cardContent = <>
  <div className="action-card-header">
      <FontAwesomeIcon icon={cardIcon} />
      <h2>{cardHeading}</h2>
    </div>
    <p className="action-card-description">
      {cardDescription}
    </p>
  </>
  return (
    <>
    {isBtn ? 
    <button className="action-card" onClick = {isBtn}>
      {cardContent}
    </button>
    :
      <Link
      to={linkRoute}
      className="action-card"
    >
      {cardContent}
    </Link>
    }
    </>

)
};
const DashboardActionCards = ({ cardData }: DashboardActionProps): JSX.Element => {
  const app = useRealmApp()
  return (
    <div className="dashboard-action-cards">
      {cardData.map((card) => (
        <DashboardActionCard
          isBtn={card?.isBtn}
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
