import { useQuery } from "@tanstack/react-query";
import { Ang } from "../../types-data";
import { getProfile } from "./services";

export const useProfile = () =>
  useQuery<any, any>({
    queryKey: ["profile"],
    queryFn: async () => getProfile(),
  });
