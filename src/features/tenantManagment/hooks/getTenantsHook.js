import { useQuery } from "@tanstack/react-query"
import { TENANTS_KEYS } from "../../../Constants/constants"
import { tenantServices } from "../services/tenantServices"

export const useGetTenants = () => {
    const query = useQuery({
        queryKey: [TENANTS_KEYS.TENANT],
        queryFn: () => tenantServices.getAll(),
    })
    return {
        clinics: query.data,
        clinicsIsLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    }
}