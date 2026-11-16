import { Activity, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../auth/authHooks/logoutHook";
import { sidebarItems } from "./sidebarItems";

function DesktopSidebar() {
    const { mutate: logout, isPending } = useLogout();

    return (
        <aside className="hidden h-svh w-72 shrink-0 flex-col border-l border-white/10 bg-[#10120f] px-5 py-6 lg:flex">
            <Link to="/dashboard" className="mb-10 flex items-center gap-3 px-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7bea00] text-[#11150c] shadow-[0_0_26px_rgba(123,234,0,0.2)]">
                    <Activity aria-hidden="true" size={23} strokeWidth={2.2} />
                </span>
                <span>
                    <span className="block text-lg font-black tracking-wide text-white">healthCare</span>
                    <span className="block text-[0.65rem] font-semibold tracking-widest text-lime-400/75">إدارة الرعاية الصحية</span>
                </span>
            </Link>

            <p className="mb-3 px-3 text-xs font-semibold text-white/35">القائمة الرئيسية</p>
            <nav aria-label="القائمة الرئيسية" className="space-y-1.5">
                {sidebarItems.map(({ label, to, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                isActive
                                    ? "bg-lime-400/10 text-lime-300 ring-1 ring-inset ring-lime-400/20"
                                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon aria-hidden="true" size={19} className={isActive ? "text-lime-400" : "text-white/45 group-hover:text-lime-300"} />
                                <span>{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-lime-400/15 bg-gradient-to-br from-lime-400/[0.08] to-transparent p-4">
                <p className="text-sm font-bold text-white">رعاية أفضل تبدأ من هنا</p>
                <p className="mt-1 text-xs leading-5 text-white/45">نظّم عملك وتابع تفاصيل مركزك من مكان واحد.</p>
            </div>

            <button
                type="button"
                onClick={() => logout()}
                disabled={isPending}
                className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/55 transition hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <LogOut aria-hidden="true" size={19} />
                {isPending ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
            </button>
        </aside>
    );
}

export default DesktopSidebar;