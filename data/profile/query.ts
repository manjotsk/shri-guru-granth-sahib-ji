import { useQuery } from "react-query";
import { Ang } from "../../types";
import { getProfile } from "./services";

export const useProfile = () =>
  useQuery<any, any, Ang, any>(["profile"], async () => getProfile());
