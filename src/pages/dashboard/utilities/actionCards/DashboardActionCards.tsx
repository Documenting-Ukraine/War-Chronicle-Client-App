import { useRealmApp } from "../../../../realm/RealmApp";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ActionCard from '../../../utilityComponents/actionCard/ActionCard'
interface CardProps {
  additionalRoute?: string;
  cardIcon: IconProp;
  cardHeading: string;
  cardDescription: string;
  replaceRoute?: string;
  isBtn?: () => void;
}
interface DashboardActionProps {
  cardData: CardProps[];
}

const DashboardActionCard = ({
  linkRoute,
  cardIcon,
  cardHeading,
  cardDescription,
  isBtn,
}: Omit<CardProps, "additionalRoute"> & { linkRoute?: string }) => {
  return (
    <>
      {isBtn ? (
        <ActionCard
          header={cardHeading}
          icon={cardIcon}
          description={cardDescription}
          type={"btn"}
          onClick={isBtn}
        />
      ) : (
        <ActionCard
          header={cardHeading}
          icon={cardIcon}
          description={cardDescription}
          type={"link"}
          linkRoute={linkRoute}
        />
      )}
    </>
  );
};
const DashboardActionCards = ({
  cardData,
}: DashboardActionProps): JSX.Element => {
  const app = useRealmApp();
  return (
    <div className="dashboard-action-cards">
      {cardData.map((card) => {
        const combinedRoute = `/dashboard/${app.currentUser?.id}/${card.additionalRoute}`;
        const route = card.replaceRoute;
        return (
          <DashboardActionCard
            isBtn={card.isBtn}
            key={card.cardHeading}
            linkRoute={route ? route : combinedRoute}
            cardIcon={card.cardIcon}
            cardDescription={card.cardDescription}
            cardHeading={card.cardHeading}
          />
        );
      })}
    </div>
  );
};
export default DashboardActionCards;
