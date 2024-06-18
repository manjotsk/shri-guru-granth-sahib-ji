import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { callApi } from "../../apiUtils";
import SERVER from "../../config/connection";

// call api to fetch ang
export const getAng = async ({ angId }) => {
  const ang = await AsyncStorageLib.getItem("ang1:" + angId);
  if (ang) {
    return JSON.parse(ang);
  }
  const res = await callApi({
    uriEndPoint: {
      uri: "ang/:angId",
      method: "GET",
      version: "",
    },
    apiHostUrl: SERVER,

    pathParams: {
      angId,
    },
  });
  
  AsyncStorageLib.setItem("ang1:" + angId, JSON.stringify(res));
  return res;
};

export const getKosh = async (words) => {
  const res = await callApi({
    uriEndPoint: {
      uri: "guru-kosh",
      method: "POST",
      version: "",
    },
    body: { words: words || [] },
    apiHostUrl: SERVER,
  });
  return res;
};


