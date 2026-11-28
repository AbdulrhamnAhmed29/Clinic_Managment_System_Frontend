import { useQuery } from "@tanstack/react-query"
import { currantUser } from "../services/currantUser"
import { CURRANT_USERV } from "../../../Constants/constants"

export const useGetCurrantUser = () => {
    const currentUserQuery = useQuery({
        queryKey: [CURRANT_USERV.ME],
        queryFn: () => currantUser.getAll(),
        staleTime: 60 * 60 * 60
    })

    return {
        user: currentUserQuery.data,
        isLoading: currentUserQuery.isLoading,
        isFetching: currentUserQuery.isFetching,
        isSuccess: currentUserQuery.isSuccess,
        isError: currentUserQuery.isError,
        error: currentUserQuery.error,
        refetch: currentUserQuery.refetch,
    }
}