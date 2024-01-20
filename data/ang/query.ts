import { useQuery } from "react-query";
import { Ang } from "../../types";
import { getAng, getKosh } from "./services";

export const useAng = ({ angId }, options) =>
  useQuery<any, any, Ang, any>(["ang", angId], async () => getAng({ angId }), {
    ...options,
  });

export const useKosh = (words) =>
  useQuery(["kosh",words], async () => getKosh(words), {
    enabled: !!words?.length
  });
