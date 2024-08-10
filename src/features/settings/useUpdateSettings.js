import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Setting succesfully updating.");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
