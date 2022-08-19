import axios from "axios";
import { Method } from "axios";
const realmApiCalls = async (
  data: Object,
  method: Method,
  funcName: string
) => {
  const realmURL = process.env.REACT_APP_API_ENDPOINT;
  const isGetMethod = method === "GET" || method === "get";
  const config = {
    method: method,
    url: `${realmURL}/public/${funcName}`,
    data: isGetMethod ? {} : data,
    params: {
      data: isGetMethod ? JSON.stringify(data) : undefined,
    },
  };
  const response = await axios(config);
  return response;
};
export default realmApiCalls;
