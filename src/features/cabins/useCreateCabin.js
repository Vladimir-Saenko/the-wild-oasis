import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Создание нового домика
  const { isLoading: isCreating, mutate: creationCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin succesfully created.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, creationCabin };
}
