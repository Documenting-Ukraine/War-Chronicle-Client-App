import axios from "axios";
import { Method } from "axios";
const realmApiCalls = async (
  data: Object,
  method: Method,
  funcName: string
) => {
  const realmURL = process.env.REACT_APP_API_ENDPOINT;
  const isGetMethod = method === "GET" || method === "get";
  const url = `${realmURL}/${funcName}`
  const config = {
    method: method,
    url: url,
    data: isGetMethod ? {} : data,
    params: isGetMethod ? data : {},
  };
  const response = await axios(config);
  return response;
};
export default realmApiCalls;
