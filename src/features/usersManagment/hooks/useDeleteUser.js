import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_KEYS } from "../../../Constants/constants";
import { userServices } from "../services/usersServices";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (userId) => userServices.delete(userId), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEYS.all] });
        },
    });

    return {
        deleteUser: mutation.mutate,        
        deleteUserAsync: mutation.mutateAsync, 
        isDeleting: mutation.isPending,    
        isError: mutation.isError,
        error: mutation.error,
    };
};