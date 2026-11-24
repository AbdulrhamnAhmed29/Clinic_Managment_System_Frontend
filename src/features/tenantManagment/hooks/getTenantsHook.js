import { useQuery } from "@tanstack/react-query"
import { TENANTS_KEYS } from "../../../Constants/constants"
import { tenantServices } from "../services/tenantCervices"

export const useGetTenants = () => {
    const query = useQuery({
        queryKey: [TENANTS_KEYS.TENANT],
        queryFn: () => tenantServices.getAll(),
        staleTime: 24 * 60 * 60 * 1000

    })

    return {
        clinics: query.data,
        clinicsIsLoading: query.isLoading,
    }
}