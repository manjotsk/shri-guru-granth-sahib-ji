import { callApi } from "../../apiUtils";
import SERVER from "../../config/connection";

export const getProfile = (userId) => {
  return callApi({
    uriEndPoint: {
      uri: "singleuser/:userId",
      method: "GET",
      version: "",
    },
    apiHostUrl: SERVER,
    pathParams: {
      userId,
    },
  }).then((res) => {
    return res;
  });
};
