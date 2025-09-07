import { useMutation } from "@tanstack/react-query";
import { addBookmark, deleteBookmark } from "./services";
import { queryClient } from "../../config/queryClient";

export const useAddBookmark = () =>
  useMutation({
    mutationFn: (body: any) => {
      return addBookmark(body);
    },
  });
export const useDeleteBookmark = () =>
  useMutation({
    mutationFn: (id: any) => {
      return deleteBookmark(id).then(async (res) => {
        await queryClient.refetchQueries({ queryKey: ["bookmarks"] });
        return res;
      });
    },
  });
