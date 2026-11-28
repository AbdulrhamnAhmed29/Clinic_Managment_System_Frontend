import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TENANTS_KEYS } from "../../../Constants/constants";
import { tenantServices } from "../services/tenantServices";

export const useAddTenant = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (tenantData) => tenantServices.create(tenantData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [TENANTS_KEYS.TENANT],
            });    
            toast.success("تمت إضافة العيادة بنجاح");
        },
    });

    return {
        addTenant: mutation.mutate,
        addTenantAsync: mutation.mutateAsync,
        isAdding: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};