import { Hospital, Pencil, ShieldCheck, Trash2, UserRound } from 'lucide-react';
import { Link } from "react-router-dom";

function UsersListDesktop({ users, onDeleteUser, isDeleting }) {
    const roleLabels = {
        super_admin: "مدير المنصة",
        clinic_admin: "مدير العيادة",
        employee: "موظف",
    };

    function getRoleLabel(role) {
        return roleLabels[role] || role?.replace(/_/g, " ") || "غير محدد";
    }

    return (
        <table className="w-full min-w-[900px] border-separate border-spacing-0 text-right">
            <thead className="bg-white/[0.035] text-[13px] font-bold text-white/60">
                <tr>
                    <th scope="col" className="border-b border-white/10 px-6 py-4">
                        المستخدم
                    </th>
                    <th scope="col" className="border-b border-white/10 px-6 py-4">
                        البريد الإلكتروني
                    </th>
                    <th scope="col" className="border-b border-white/10 px-6 py-4">
                        العيادة
                    </th>
                    <th scope="col" className="border-b border-white/10 px-6 py-4">
                        الصلاحية
                    </th>
                    <th scope="col" className="border-b border-white/10 px-6 py-4">
                        الإجراءات
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    const isPrivileged = user.role === "clinic_admin" || user.role === "super_admin";
                    const RoleIcon = isPrivileged ? ShieldCheck : UserRound;

                    return (
                        <tr
                            key={user._id}
                            className="transition-colors hover:bg-lime-400/[0.035] [&:last-child>td]:border-b-0"
                        >
                            <td className="border-b border-white/[0.06] px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "صورة المستخدم"}
                                            className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover shadow-sm"
                                        />
                                    ) : (
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lime-400/20 bg-lime-400/[0.08] text-base font-bold text-lime-300">
                                            {user.name?.trim().charAt(0) || "م"}
                                        </span>
                                    )}
                                    <span className="max-w-[220px] truncate text-sm font-bold text-white">
                                        {user.name || "بدون اسم"}
                                    </span>
                                </div>
                            </td>
                            <td className="border-b border-white/[0.06] px-6 py-4 text-left text-[13px] text-white/65" dir="ltr">
                                <span className="inline-block max-w-[230px] truncate align-middle">
                                    {user.email || "غير محدد"}
                                </span>
                            </td>
                            <td className="border-b border-white/[0.06] px-6 py-4">
                                <div className="inline-flex max-w-[220px] items-center gap-2 text-[13px] text-white/70">
                                    <Hospital
                                        size={16}
                                        className="shrink-0 text-white/40"
                                        aria-hidden="true"
                                    />
                                    <span className="truncate">
                                        {user.tenantId?.name || "غير محددة"}
                                    </span>
                                </div>
                            </td>
                            <td className="border-b border-white/[0.06] px-6 py-4">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isPrivileged
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
                            <td className="border-b border-white/[0.06] px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/dashboard/users/${user._id}/edit`}
                                        aria-label={`تعديل ${user.name}`}
                                        title="تعديل المستخدم"
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-lime-400/15 bg-lime-400/[0.04] px-3 text-xs font-semibold text-lime-200/80 transition hover:border-lime-400/35 hover:bg-lime-400/[0.09] hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                                    >
                                        <Pencil size={16} aria-hidden="true" />
                                        تعديل
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteUser(user)}
                                        disabled={isDeleting}
                                        aria-label={`حذف ${user.name}`}
                                        title="حذف المستخدم"
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-400/15 bg-red-400/[0.035] px-3 text-xs font-semibold text-red-200/75 transition hover:border-red-400/35 hover:bg-red-400/[0.08] hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Trash2 size={16} aria-hidden="true" />
                                        حذف
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default UsersListDesktop
