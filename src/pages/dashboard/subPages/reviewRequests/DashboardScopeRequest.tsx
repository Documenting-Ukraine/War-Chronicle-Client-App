import { ScopeRequest } from "../../../../store/reducers/dashboard/reviewRequests/types";

const dashboardScopeRequest = (data: ScopeRequest) => {
  return [
    { key: "Name", content: data.first_name + " " + data.last_name },
    { key: "Email", content: data.email },
    { key: "Requested Category", content: data.category },
  ];
};
export default dashboardScopeRequest;
