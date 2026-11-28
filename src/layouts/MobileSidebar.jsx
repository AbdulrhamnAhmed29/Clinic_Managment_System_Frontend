import { useCallback, useEffect, useRef, useState } from "react";
import { LogOut, MoreHorizontal, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../auth/authHooks/logoutHook";
import { confirmAction } from "../components/ui/confirmAction";
import { sidebarItems } from "./sidebarItems";

const primaryItems = sidebarItems.slice(0, 3);
const extraItems = sidebarItems.slice(3);

function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef(null);
    const triggerRef = useRef(null);
    const { mutate: logout, isPending } = useLogout();

    const handleLogout = async () => {
        const result = await confirmAction({
            title: "تسجيل الخروج؟",
            text: "هل أنت متأكد من رغبتك في تسجيل الخروج؟",
            confirmText: "تسجيل الخروج",
            icon: "question",
        });

        if (result.isConfirmed) {
            closeMenu();
            logout();
        }
    };

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
    }, []);

    useEffect(() => {
        if (!isOpen) return undefined;

        const focusableElements = sheetRef.current?.querySelectorAll(
            'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];
        firstElement?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            } else if (event.key === "Tab" && firstElement && lastElement) {
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeMenu, isOpen]);

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="إغلاق القائمة"
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
                />
            )}
            <section
                ref={sheetRef}
                id="mobile-navigation-sheet"
                role="dialog"
                aria-modal={isOpen ? "true" : undefined}
                aria-hidden={!isOpen}
                inert={!isOpen}
                aria-label="المزيد من الأقسام"
                className={`fixed inset-x-0 bottom-0 z-50 rounded-t-[1.75rem] border border-white/10 bg-[#111411] px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 shadow-[0_-24px_70px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out lg:hidden ${
                    isOpen ? "translate-y-0" : "pointer-events-none translate-y-full"
                }`}
            >
                <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-base font-bold text-white">كل الأقسام</p>
                        <p className="mt-1 text-xs text-white/45">اختر القسم الذي تريد فتحه</p>
                    </div>
                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="إغلاق"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white/65 hover:bg-white/10"
                    >
                        <X size={19} />
                    </button>
                </div>
                <nav aria-label="الأقسام الإضافية" className="grid grid-cols-2 gap-2">
                    {extraItems.map(({ label, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl border p-3 text-sm font-medium transition ${
                                    isActive
                                        ? "border-lime-400/20 bg-lime-400/10 text-lime-300"
                                        : "border-white/[0.06] bg-white/[0.025] text-white/70 hover:bg-white/[0.06]"
                                }`
                            }
                        >
                            <Icon size={18} aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isPending}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                >
                    <LogOut size={18} aria-hidden="true" />
                    {isPending ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
                </button>
            </section>

            <nav
                aria-label="التنقل السريع"
                className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#10120f]/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] backdrop-blur-xl lg:hidden"
            >
                <div className="mx-auto grid max-w-lg grid-cols-4">
                    {primaryItems.map(({ label, to, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex min-h-14 flex-col items-center justify-center gap-1 text-[0.65rem] font-medium transition ${
                                    isActive ? "text-lime-300" : "text-white/45"
                                }`
                            }
                        >
                            <Icon size={19} aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                    <button
                        ref={triggerRef}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation-sheet"
                        onClick={() => setIsOpen((open) => !open)}
                        className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[0.65rem] font-medium transition ${
                            isOpen ? "text-lime-300" : "text-white/45"
                        }`}
                    >
                        <MoreHorizontal size={20} aria-hidden="true" />
                        المزيد
                    </button>
                </div>
            </nav>
        </>
    );
}

export default MobileSidebar;