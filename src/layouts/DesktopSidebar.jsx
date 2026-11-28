import { ChevronLeft, ChevronRight, Hospital, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../auth/authHooks/logoutHook";
import { useState } from "react";
import { confirmAction } from "../components/ui/confirmAction";
import { useGetCurrantUser } from "../features/usersManagment/hooks/useGetCurrantUser";
import { hasPermission } from "../shared/authorization/hasPermission";
import { sidebarItems } from "./sidebarItems";

function DesktopSidebar() {
    const { mutate: logout, isPending } = useLogout();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user: userResponse } = useGetCurrantUser();
    const user = userResponse?.user ?? userResponse;
    const visibleItems = sidebarItems.filter(
        ({ permission }) => !permission || hasPermission(user?.role, permission)
    );

    const handleLogout = async () => {
        const result = await confirmAction({
            title: "تسجيل الخروج؟",
            text: "هل أنت متأكد من رغبتك في تسجيل الخروج؟",
            confirmText: "تسجيل الخروج",
            icon: "question",
        });

        if (result.isConfirmed) logout();
    };

    return (
        <aside
            className={`hidden h-svh shrink-0 flex-col border-l border-white/10 bg-[#10120f] py-6 transition-[width,padding] duration-200 ease-out motion-reduce:transition-none lg:flex ${
                isCollapsed ? "w-20 px-3" : "w-72 px-5"
            }`}
        >
            <Link
                to="/dashboard"
                aria-label="العودة إلى لوحة التحكم"
                title={isCollapsed ? "لوحة التحكم" : undefined}
                className={`mb-5 flex items-center gap-3 ${isCollapsed ? "justify-center px-0" : "px-2"}`}
            >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] text-[var(--brand-primary)] shadow-[0_0_26px_color-mix(in_srgb,var(--brand-primary)_20%,transparent)]">
                    <Hospital aria-hidden="true" size={23} strokeWidth={2.2} />
                </span>
                {!isCollapsed && (
                    <span className="min-w-0">
                        <span className="block truncate text-lg font-black tracking-wide text-white">Clinics System</span>
                        <span className="block truncate text-[0.65rem] font-semibold tracking-widest text-lime-400/75">إدارة الرعاية الصحية</span>
                    </span>
                )}
            </Link>

            <button
                type="button"
                aria-label={isCollapsed ? "توسيع القائمة الجانبية" : "طي القائمة الجانبية"}
                aria-expanded={!isCollapsed}
                aria-controls="desktop-sidebar-navigation"
                title={isCollapsed ? "توسيع القائمة" : "طي القائمة"}
                onClick={() => setIsCollapsed((collapsed) => !collapsed)}
                className={`mb-5 flex h-9 items-center rounded-lg border border-white/[0.07] text-white/50 transition hover:border-lime-400/20 hover:bg-white/[0.04] hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 ${
                    isCollapsed ? "justify-center" : "w-full justify-between px-3"
                }`}
            >
                {!isCollapsed && <span className="text-xs font-semibold">تصغير القائمة</span>}
                {isCollapsed ? <ChevronLeft size={17} aria-hidden="true" /> : <ChevronRight size={17} aria-hidden="true" />}
            </button>

            {!isCollapsed && (
                <p className="mb-3 px-3 text-xs font-semibold text-white/35">
                    القائمة الرئيسية
                </p>
            )}
            <nav id="desktop-sidebar-navigation" aria-label="القائمة الرئيسية" className="space-y-1.5">
                {visibleItems.map(({ label, to, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        aria-label={label}
                        title={isCollapsed ? label : undefined}
                        className={({ isActive }) =>
                            `group flex items-center rounded-xl py-3 text-sm font-medium transition ${
                                isCollapsed ? "justify-center px-0" : "gap-3 px-3"
                            } ${
                                isActive
                                    ? "bg-lime-400/10 text-lime-300 ring-1 ring-inset ring-lime-400/20"
                                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon aria-hidden="true" size={19} className={`shrink-0 ${isActive ? "text-lime-400" : "text-white/45 group-hover:text-lime-300"}`} />
                                {!isCollapsed && <span>{label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {!isCollapsed && (
                <div className="mt-auto rounded-2xl border border-lime-400/15 bg-gradient-to-br from-lime-400/[0.08] to-transparent p-4">
                <p className="text-sm font-bold text-white">رعاية أفضل تبدأ من هنا</p>
                <p className="mt-1 text-xs leading-5 text-white/45">نظّم عملك وتابع تفاصيل مركزك من مكان واحد.</p>
                </div>
            )}

            <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                aria-label="تسجيل الخروج"
                title={isCollapsed ? "تسجيل الخروج" : undefined}
                className={`${isCollapsed ? "mt-auto" : "mt-4"} flex min-h-11 w-full items-center rounded-xl py-3 text-sm font-medium text-white/55 transition hover:bg-red-400/10 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${
                    isCollapsed ? "justify-center px-0" : "gap-3 px-3"
                }`}
            >
                <LogOut aria-hidden="true" size={19} />
                {!isCollapsed && (isPending ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج")}
            </button>
        </aside>
    );
}

export default DesktopSidebar;