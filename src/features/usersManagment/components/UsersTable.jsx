import {
    ChevronLeft,
    ChevronRight,
    Hospital,
    ShieldCheck,
    UserRound,
    UsersRound,
} from "lucide-react";
import { useGetUsers } from "../hooks/useGetAllUser";
import { useCursorPagination } from "../../../hooks/useCursorPagination";
import EmptyState from "../../../components/ui/EmptyState";
import ErrorState from "../../../components/ui/ErrorState";
import LoadingState from "../../../components/ui/LoadingState";
import { scrollToTop } from "../../../components/scrollToTop.js";

const roleLabels = {
    super_admin:"مدير المنصه",
    clinic_admin: "مدير العيادة",
    employee: "موظف",
};

function getRoleLabel(role) {
    return roleLabels[role] || role?.replace(/_/g, " ") || "غير محدد";
}

function UsersTable() {

    const {
        cursor,
        hasPreviousPage,
        previousPage,
        nextPage,
    } = useCursorPagination();
    const {
        refetch,
        isError,
        error,
        isLoading,
        nextCursor,
        users,
        isSuccess
    } = useGetUsers(cursor);

    if (isLoading) {
        return <LoadingState message="جاري تحميل المستخدمين..." />;
    }

    if (isError) {
        return (
            <ErrorState
                title="تعذر تحميل المستخدمين"
                message={error?.message || "حاول مرة أخرى بعد قليل."}
                onRetry={refetch}
            />
        );
    }


    if (isSuccess && users.length === 0) {
        return (
            <EmptyState
                icon={UsersRound}
                title="لا يوجد مستخدمون للعرض"
                description="ستظهر حسابات أعضاء الفريق هنا عند توفرها."
            />
        );
    }

    const hasNextPage = nextCursor !== null;

    const handlePreviousPage = () => {
        if (!hasPreviousPage) return;
        previousPage();
        scrollToTop();
    };

    const handleNextPage = () => {
        if (!hasNextPage) return;
        nextPage(nextCursor);
        scrollToTop();
    };

    return (
        <section
            aria-labelledby="users-table-heading"
            className="glass-surface overflow-hidden rounded-2xl border border-white/10"
        >
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                    <h2 id="users-table-heading" className="font-bold text-white">
                        قائمة المستخدمين
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                        حسابات أعضاء الفريق والعيادات المرتبطة بهم
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">
                    <UsersRound
                        size={14}
                        className="text-lime-400"
                        aria-hidden="true"
                    />
                    <span>{users.length} مستخدمين في الصفحة</span>
                </div>
            </header>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-right">
                    <thead className="bg-white/[0.02] text-xs font-semibold text-white/45">
                        <tr>
                            <th scope="col" className="px-4 py-3.5 sm:px-6">
                                المستخدم
                            </th>
                            <th scope="col" className="px-4 py-3.5 sm:px-6">
                                العيادة
                            </th>
                            <th scope="col" className="px-4 py-3.5 sm:px-6">
                                الصلاحية
                            </th>
                             
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                        {users.map((user) => {
                            const isAdmin = user.role === "clinic_admin";
                            const RoleIcon = isAdmin ? ShieldCheck : UserRound;

                            return (
                                <tr
                                    key={user._id}
                                    className="transition-colors hover:bg-white/[0.02]"
                                >
                                    <td className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime-400/15 bg-lime-400/[0.08] text-sm font-bold text-lime-300">
                                                {user.name?.trim().charAt(0) || "م"}
                                            </span>
                                            <span className="font-semibold text-white">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 sm:px-6">
                                        <div className="inline-flex items-center gap-2 text-sm text-white/70">
                                            <Hospital
                                                size={16}
                                                className="shrink-0 text-white/40"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                {user.tenantId?.name || "غير محددة"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 sm:px-6">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isAdmin
                                                ? "border-lime-400/20 bg-lime-400/[0.08] text-lime-300"
                                                : "border-white/10 bg-white/[0.03] text-white/65"
                                                }`}
                                        >
                                            <RoleIcon
                                                size={14}
                                                aria-hidden="true"
                                            />
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={!hasPreviousPage}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:cursor-not-allowed disabled:opacity-35"
                >
                    <ChevronRight size={17} aria-hidden="true" />
                    السابق
                </button>
                <span className="text-xs text-white/45">
                    {users.length} نتيجة
                </span>
                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:cursor-not-allowed disabled:opacity-35"
                >
                    التالي
                    <ChevronLeft size={17} aria-hidden="true" />
                </button>
            </footer>
        </section>
    );
}

export default UsersTable;
