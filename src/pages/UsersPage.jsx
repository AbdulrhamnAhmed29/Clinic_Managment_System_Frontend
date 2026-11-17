import { UsersRound } from "lucide-react";

function UsersPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <header>
                <p className="mb-2 text-sm font-semibold text-lime-400">إدارة الفريق</p>
                <h1 className="text-2xl font-black text-white sm:text-3xl">إدارة المستخدمين</h1>
                <p className="mt-2 text-sm leading-6 text-white/55">
                    إدارة حسابات أعضاء الفريق وصلاحياتهم.
                </p>
            </header>

            <section className="glass-surface overflow-hidden rounded-2xl border">
                <div className="grid grid-cols-3 gap-3 border-b border-white/10 px-5 py-4 text-sm font-semibold text-white/60 sm:grid-cols-4 sm:px-6">
                    <span>الاسم</span>
                    <span>البريد الإلكتروني</span>
                    <span>الدور</span>
                    <span className="hidden sm:block">الحالة</span>
                </div>
                <div className="flex flex-col items-center px-5 py-12 text-center">
                    <UsersRound size={24} className="text-lime-400" aria-hidden="true" />
                    <h2 className="mt-4 font-bold text-white">لا يوجد مستخدمون للعرض</h2>
                    <p className="mt-2 text-sm text-white/55">
                        ستظهر حسابات أعضاء الفريق هنا عند ربط بيانات المستخدمين.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default UsersPage;
