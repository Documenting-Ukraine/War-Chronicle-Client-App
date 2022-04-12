import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const manageActionCard = () => {
    const cardData = [
      {
        additionalRoute: `manage/review-new-users`,
        cardIcon: faUserPlus,
        cardHeading: `Review Requests`,
        cardDescription: `Review requests from users wanting to become contributors`,
      },
      {
        additionalRoute: `manage/review-new-scopes`,
        cardIcon: faPlusSquare,
        cardHeading: `Review New Scope`,
        cardDescription: `Review requests from contributors wanting to access a new category scope`,
      },
    ];
    return cardData
}
export default manageActionCard