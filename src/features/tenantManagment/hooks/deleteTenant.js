import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TENANTS_KEYS } from "../../../Constants/constants";
import { tenantServices } from "../services/tenantServices";

export const useDeleteTenant = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (tenantId) => tenantServices.delete(tenantId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [TENANTS_KEYS.TENANT],
            });
            toast.success("تم حذف العيادة بنجاح");
        },
    });

    return {
        deleteTenant: mutation.mutate,
        deleteTenantAsync: mutation.mutateAsync,
        isDeleting: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};