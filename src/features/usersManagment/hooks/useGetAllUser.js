import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "../../../Constants/constants"
import { userServices } from "../services/usersServices";

export const useGetUsers = (cursor = null, limit) => {
    const usersData = useQuery({
        queryKey: [USERS_KEYS.USERS, cursor, limit],
        queryFn: () => userServices.getAll(
            cursor == null ? { params: { limit } } : { params: { cursor, limit } }
        ),
        placeholderData: keepPreviousData,
        staleTime: 24 * 60 * 60 * 1000
    });

    return {
        users: usersData.data?.users ?? [],
        nextCursor: usersData.data?.nextCursor ?? null,
        hasMore: usersData.data?.hasMore,
        isLoading: usersData.isLoading,
        isFetching: usersData.isFetching,
        isSuccess: usersData.isSuccess,
        isError: usersData.isError,
        error: usersData.error,
        refetch: usersData.refetch,
    };
};