import { useQuery } from "@tanstack/react-query";
import { TENANTS_KEYS } from "../../../Constants/constants";
import { tenantServices } from "../services/tenantServices";

export const useGetTenantById = (id) => {
    const query = useQuery({
        queryKey: [TENANTS_KEYS.TENANT, id],
        queryFn: () => tenantServices.getById(id),
        enabled: Boolean(id),
    });

    return {
        tenant: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        isSuccess: query.isSuccess,
        error: query.error,
        refetch: query.refetch,
    };
};