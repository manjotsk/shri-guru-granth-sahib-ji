import { useQuery } from "@tanstack/react-query";
import { Ang } from "../../types-data";
import { getBookmark } from "./services";

export const useBookmarks = () =>
  useQuery<any, any>({
    queryKey: ["bookmarks"],
    queryFn: async () => getBookmark(),
  });
