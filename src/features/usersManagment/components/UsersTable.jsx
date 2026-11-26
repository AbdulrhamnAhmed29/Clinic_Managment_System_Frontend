import {
    ChevronLeft,
    ChevronRight,
    UsersRound,
} from "lucide-react";
import { useGetUsers } from "../hooks/useGetAllUser";
import { useCursorPagination } from "../../../hooks/useCursorPagination";
import EmptyState from "../../../components/ui/EmptyState";
import ErrorState from "../../../components/ui/ErrorState";
import LoadingState from "../../../components/ui/LoadingState";
import { scrollToTop } from "../../../components/scrollToTop.js";
import UsersListDesktop from "./usersListDesktop.jsx";
import UsersListMobile from "./usersListMobile.jsx";


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
    } = useGetUsers(cursor, 10);

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
                    <UsersRound size={14} className="text-lime-400" aria-hidden="true" />
                    <span>{users.length} مستخدمين في الصفحة</span>
                </div>
            </header>

            <div className="hidden sm:block overflow-x-auto">
                <UsersListDesktop users={users} />
            </div>
            <div className="sm:hidden">
                <UsersListMobile users={users} />
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
