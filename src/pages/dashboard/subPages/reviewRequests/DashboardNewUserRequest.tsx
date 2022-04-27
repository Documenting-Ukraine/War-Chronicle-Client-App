import { NewUserRequest } from "../../../../store/reducers/dashboard/reviewRequests/types";
const dashboardNewUserRequest = ( data: NewUserRequest ) => {
    const generalInfoArr = [
        {
            key: "Name",
            content: data.first_name + " " + data.last_name,
        },
        {
            key: "Email",
            content: data.email,
        },
        {
            key: "Phone Number",
            content: data.phone_number ? data.phone_number : "N/A",
        },
        {
            key: "Preferred Contact",
            content: data.preferred_contact,
        },
        ];
  return generalInfoArr
};
export default dashboardNewUserRequest;
