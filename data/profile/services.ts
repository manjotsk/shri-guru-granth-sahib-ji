import { callApi } from "../../apiUtils";
import SERVER from "../../config/connection";

export const getProfile = () => {
  return callApi({
    uriEndPoint: {
      uri: "profile",
      method: "GET",
      version: "",
    },
    apiHostUrl: SERVER,
  }).then((res) => {
    return res;
  });
};
