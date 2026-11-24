import { useMutation } from "@tanstack/react-query"
import { UploadService } from "../services/imageUploadServices"

export const useUploadImage = () => {
  

    const mutation = useMutation({
        mutationFn: (file) => UploadService.uploadImage(file),
        onSuccess: () => {
            console.log("created image successfully");
        }
    })
    return {
        CreateImage: mutation.mutateAsync,
        imageIsLoading: mutation.isPending,
        imageIsError: mutation.isError,
    }
}