import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TENANTS_KEYS } from "../../../Constants/constants";
import { tenantServices } from "../services/tenantServices";

export const useUpdateTenant = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ({ id, data }) => tenantServices.update(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [TENANTS_KEYS.TENANT],
            });
            toast.success("تم تحديث بيانات العيادة بنجاح");
        },
    });

    return {
        updateTenant: mutation.mutate,
        updateTenantAsync: mutation.mutateAsync,
        isUpdating: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    };
};
