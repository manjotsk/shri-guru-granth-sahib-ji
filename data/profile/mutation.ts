import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { getProfile } from "./services";

export const useGetProfile = () =>
  useMutation({
    mutationFn: () => {
      return getProfile().then(async (res) => {
        await queryClient.refetchQueries({ queryKey: ["profile"] });
        return res;
      });
    },
  });
