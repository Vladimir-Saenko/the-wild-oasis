import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  // Редактирование домика
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account succesfully updating.");

      queryClient.setQueryData(["user"], user); //обновление user в кэше
      //queryClient.invalidateQueries({
      //  queryKey: ["user"],
      //});
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
