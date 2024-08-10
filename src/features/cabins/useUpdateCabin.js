import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  // Редактирование домика
  const { isLoading: isEditing, mutate: updatingCabin } = useMutation({
    mutationFn: ({ cabinNewData, id }) => updateCabin(cabinNewData, id),
    onSuccess: () => {
      toast.success("Cabin succesfully updating.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, updatingCabin };
}
