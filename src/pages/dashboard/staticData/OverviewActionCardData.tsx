import {
  faFileLines,
  faPlusSquare,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
const overviewActionCardData = (accountType: string) => [
  {
    additionalRoute: "contribute",
    cardIcon: faFileLines,
    cardHeading: "Submit New Record",
    cardDescription:
      accountType === "admin"
        ? "Create a new record for any category scope"
        : "Create a new record for one of your assigned category scopes",
  },
  {
    additionalRoute:
      accountType === "admin" ? "manage" : "forms/request-new-scope",
    cardIcon: accountType === "admin" ? faUserCircle : faPlusSquare,
    cardHeading: accountType === "admin" ? "Manage Users" : "Request New Scope",
    cardDescription:
      accountType === "admin"
        ? "Assign contributors new scopes or add new users to management"
        : "Request access to a new category scope. This will allow you to add records to a new category scope of this archive",
  },
];
export default overviewActionCardData;
