import { useQuery } from "@tanstack/react-query"
import { USERS_KEYS } from "../../../Constants/constants"
import { userServices } from "../services/usersServices"

export const useGetOneUser = (id) => {
    const userData = useQuery({
        queryKey: [USERS_KEYS.USERS, id],
        queryFn: () => userServices.getById(id),
        enabled: !!id
    })
    return {
        user: userData.data,
        isLoading: userData.isLoading,
        isError: userData.isError,
        error: userData.error
    }
}