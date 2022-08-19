import axios from "axios";
import { Method } from "axios";
const realmApiCalls = async (
  data: Object,
  method: Method,
  funcName: string
) => {
  const realmURL = process.env.REACT_APP_MONGO_HTTP_ENDPOINT;
  const secret = process.env.REACT_APP_HTTP_ENDPOINTS_SECRET;
  const isGetMethod = method === "GET" || method === "get";
  const config = {
    method: method,
    url: `${realmURL}${funcName}`,
    data: isGetMethod ? {} : data,
    params: {
      secret: secret,
      data: isGetMethod ? JSON.stringify(data) : undefined,
    },
  };
  const response = await axios(config);
  return response;
};
export default realmApiCalls;
