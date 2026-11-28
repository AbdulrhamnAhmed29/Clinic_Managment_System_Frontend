import Swal from "sweetalert2";

export function confirmAction({
    title,
    text,
    confirmText = "متابعة",
    icon = "warning",
    isDestructive = false,
}) {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        reverseButtons: true,
        focusCancel: true,
        confirmButtonText: confirmText,
        cancelButtonText: "إلغاء",
        confirmButtonColor: isDestructive ? "#dc2626" : "#7bea00",
        cancelButtonColor: "#3f453f",
        background: "#111411",
        color: "#f5f5f5",
    });
}
