import { useQuery } from "@tanstack/react-query";
import { Ang } from "../../types-data";
import { getAng, getKosh } from "./services";

export const useAng = ({ angId }: any, options?: any) =>
  useQuery<any, any>({
    queryKey: ["angg", angId],
    queryFn: async () => getAng({ angId }),
    ...options,
  });

export const useKosh = (words: any) =>
  useQuery({
    queryKey: ["kosh", words],
    queryFn: async () => getKosh(words),
    enabled: !!words?.length,
  });
