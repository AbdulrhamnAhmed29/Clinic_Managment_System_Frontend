import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_KEYS } from "../../../Constants/constants";
import { userServices } from "../services/usersServices";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, data }) => userServices.update(id, data),
        onSuccess: (updatedUser, variables) => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEYS.USERS] });
            queryClient.setQueryData([USERS_KEYS.USERS, variables.id], updatedUser);
        },
    });
    return {
        updateUser: mutation.mutate,
        updateUserAsync: mutation.mutateAsync,
        isUpdating: mutation.isPending, 
        isError: mutation.isError,
        error: mutation.error,
    };
};