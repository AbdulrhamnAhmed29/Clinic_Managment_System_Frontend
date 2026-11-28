import { Hospital, Pencil, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const roleLabels = {
    super_admin: "مدير المنصة",
    clinic_admin: "مدير العيادة",
    employee: "موظف",
};

function UsersListMobile({ users, onDeleteUser, isDeleting }) {
    return (
        <ul className="space-y-3 p-3">
            {users.map((user) => {
                const RoleIcon = user.role === "employee" ? UserRound : ShieldCheck;

                return (
                    <li
                        key={user._id}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3.5 shadow-sm transition-colors hover:border-white/[0.14]"
                    >
                        <div className="flex min-w-0 items-start gap-3">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "صورة المستخدم"}
                                className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
                            />
                        ) : (
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lime-400/20 bg-lime-400/[0.08] text-base font-bold text-lime-300">
                                {user.name?.trim().charAt(0) || "م"}
                            </span>
                        )}
                            <div className="min-w-0 flex-1">
                                <div className="flex min-w-0 items-start justify-between gap-2">
                                    <div className="min-w-0 pt-0.5">
                                        <p className="truncate text-sm font-semibold text-white">
                                            {user.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs text-white/55" dir="ltr">
                                            {user.email || "غير محدد"}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1.5">
                                        <Link
                                            to={`/dashboard/users/${user._id}/edit`}
                                            aria-label={`تعديل ${user.name}`}
                                            title="تعديل المستخدم"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/65 transition hover:border-lime-400/30 hover:bg-lime-400/[0.08] hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                                        >
                                            <Pencil size={15} aria-hidden="true" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteUser(user)}
                                            disabled={isDeleting}
                                            aria-label={`حذف ${user.name}`}
                                            title="حذف المستخدم"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/65 transition hover:border-red-400/30 hover:bg-red-400/[0.08] hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 size={15} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
                                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-xs text-white/60">
                                        <Hospital size={13} className="shrink-0 text-white/40" aria-hidden="true" />
                                        <span className="truncate">{user.tenantId?.name || "غير محددة"}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/15 bg-lime-400/[0.06] px-2.5 py-1.5 text-xs text-lime-200/80">
                                        <RoleIcon size={13} aria-hidden="true" />
                                        {roleLabels[user.role] || user.role?.replace(/_/g, " ") || "غير محدد"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default UsersListMobile
