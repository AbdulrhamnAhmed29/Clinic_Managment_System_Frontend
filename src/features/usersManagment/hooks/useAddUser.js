import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userServices } from "../services/usersServices"
import { USERS_KEYS } from "../../../Constants/constants";

export const useAddUsers = (data) => {
    const queryClient = useQueryClient();
    const AddUser = useMutation({
        mutationFn: () => userServices.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEYS.USERS] });
        }
    })
    return {
        createUser: AddUser.mutate,         
        createUserAsync: AddUser.mutateAsync,
        isLoading: AddUser.isPending,    
        isSuccess: AddUser.isSuccess,
        isError: AddUser.isError,
        error: AddUser.error,
    }
}