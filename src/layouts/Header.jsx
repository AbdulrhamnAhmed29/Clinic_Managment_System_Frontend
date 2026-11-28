import { useState } from "react";
import { Hospital, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetCurrantUser } from "../features/usersManagment/hooks/useGetCurrantUser";

function Headers() {
    const { user: userResponse, isLoading } = useGetCurrantUser();
    const user = userResponse?.user ?? userResponse;
    const [failedImageUrl, setFailedImageUrl] = useState(null);
    const name = user?.name?.trim() || "المستخدم";
    const roleLabels = {
        super_admin: "مدير المنصة",
        clinic_admin: "مدير العيادة",
        employee: "موظف",
    };
    const roleLabel = roleLabels[user?.role] || "عضو الفريق";

    return (
        <header
            dir="ltr" className="flex min-h-[4.5rem] shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] bg-[#0c0e0c]/95 px-4 py-2.5 backdrop-blur-xl sm:px-7"
        >
            <Link
                to="/dashboard"
                aria-label="العودة إلى لوحة التحكم"
                className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-400"
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-lime-400/15 bg-lime-400/[0.08] text-lime-300 shadow-[0_0_22px_color-mix(in_srgb,var(--brand-primary)_15%,transparent)] sm:h-11 sm:w-11">
                    <Hospital aria-hidden="true" size={22} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                    <span className="block truncate text-sm font-black tracking-wide text-white sm:text-base">
                        عيادات الزهور
                    </span>
                    <span className="hidden text-[11px] font-medium text-white/45 sm:block">
                        إدارة العيادات والرعاية الصحية
                    </span>
                </span>
            </Link>

            <div
                dir="rtl"
                role="group"
                className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] py-1.5 pl-2 pr-1.5 sm:gap-3 sm:py-2 sm:pl-3 sm:pr-2"
                aria-label="بيانات المستخدم الحالي"
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-lime-400/20 bg-lime-400/[0.08] text-sm font-bold text-lime-300 sm:h-10 sm:w-10">
                    {user?.image && failedImageUrl !== user.image ? (
                        <img
                            src={user.image}
                            alt={`صورة ${name}`}
                            className="h-full w-full object-cover"
                            onError={() => setFailedImageUrl(user.image)}
                        />
                    ) : (
                        name.charAt(0)
                    )}
                </span>
                <span className="min-w-0">
                    <span className="block max-w-[130px] truncate text-xs font-bold text-white sm:max-w-48 sm:text-sm">
                        {isLoading ? "جارٍ التحميل..." : name}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-white/45 sm:text-xs">
                        {user?.role ? (
                            <ShieldCheck size={12} aria-hidden="true" />
                        ) : (
                            <UserRound size={12} aria-hidden="true" />
                        )}
                        <span className="truncate">{roleLabel}</span>
                    </span>
                </span>
            </div>
        </header>
    )
}

export default Headers
