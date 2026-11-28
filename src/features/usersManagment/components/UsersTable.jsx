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
import { useDeleteUser } from "../hooks/useDeleteUser";
import { toast } from "sonner";
import { confirmAction } from "../../../components/ui/confirmAction";


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
    } = useGetUsers(cursor, 30);
    const { deleteUserAsync, isDeleting } = useDeleteUser();

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

    const handleDeleteUser = async (user) => {
        const result = await confirmAction({
            title: "حذف المستخدم؟",
            text: `هل أنت متأكد من حذف ${user.name}؟ لا يمكن التراجع عن هذا الإجراء.`,
            confirmText: "حذف المستخدم",
            isDestructive: true,
        });
        if (!result.isConfirmed) return;

        try {
            await deleteUserAsync(user._id);
            toast.success("تم حذف المستخدم بنجاح");
        } catch (deleteError) {
            toast.error(deleteError?.message || "تعذر حذف المستخدم");
        }
    };

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
                <UsersListDesktop users={users} onDeleteUser={handleDeleteUser} isDeleting={isDeleting} />
            </div>
            <div className="sm:hidden">
                <UsersListMobile users={users} onDeleteUser={handleDeleteUser} isDeleting={isDeleting} />
            </div>

            <footer className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-3 sm:gap-3 sm:px-6">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={!hasPreviousPage}
                    aria-label="الصفحة السابقة"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.025] px-2.5 text-xs font-semibold text-white/75 transition hover:border-lime-400/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:cursor-not-allowed disabled:opacity-35 sm:gap-2 sm:px-3 sm:text-sm"
                >
                    <ChevronRight size={19} aria-hidden="true" />
                    السابق
                </button>
                <span className="text-center text-[11px] text-white/45 sm:text-xs">
                    {users.length} نتيجة
                </span>
                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    aria-label="الصفحة التالية"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.025] px-2.5 text-xs font-semibold text-white/75 transition hover:border-lime-400/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:cursor-not-allowed disabled:opacity-35 sm:gap-2 sm:px-3 sm:text-sm"
                >
                    التالي
                    <ChevronLeft size={19} aria-hidden="true" />
                </button>
            </footer>
        </section>
    );
}

export default UsersTable;
