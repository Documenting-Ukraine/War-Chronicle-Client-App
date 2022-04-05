import axios from "axios";
import { Method } from 'axios'
const realmApiCalls = async (data: Object, method: Method) => {
  const realmURL = process.env.REACT_APP_MONGO_HTTP_ENDPOINT;
  const funcName = "access_form_submit";
  const secret = process.env.REACT_APP_HTTP_ENDPOINTS_SECRET;
  const response = await axios({
    method: method,
    url: `${realmURL}${funcName}`,
    data: data,
    params: {
      secret: secret,
    },
  });
  return response;
};
export default realmApiCalls