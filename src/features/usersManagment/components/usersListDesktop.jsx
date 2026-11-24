import { Hospital, ShieldCheck, UserRound } from 'lucide-react';

function UsersListDesktop({users}) {
    const roleLabels = {
        super_admin: "مدير المنصه",
        clinic_admin: "مدير العيادة",
        employee: "موظف",
    };

    function getRoleLabel(role) {
        return roleLabels[role] || role?.replace(/_/g, " ") || "غير محدد";
    }

    return (
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
    )
}

export default UsersListDesktop
