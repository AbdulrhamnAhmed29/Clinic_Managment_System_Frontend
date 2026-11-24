import { Hospital, ShieldCheck, UserRound } from "lucide-react";

const roleLabels = {
    super_admin: "مدير المنصة",
    clinic_admin: "مدير العيادة",
    employee: "موظف",
};

function UsersListMobile({ users }) {
    return (
        <ul className="divide-y divide-white/[0.06]">
            {users.map((user) => {
                const RoleIcon = user.role === "employee" ? UserRound : ShieldCheck;

                return (
                    <li key={user._id} className="flex  gap-3 px-4 py-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime-400/15 bg-lime-400/[0.08] text-sm font-bold text-lime-300">
                            {user.name?.trim().charAt(0) || "م"}
                        </span>
                        <div className="min-w-0  w-full flex flex-row items-center justify-between">
                            <div>
                                <p className="truncate font-semibold text-white">{user.name}</p>
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                                    <Hospital size={14} aria-hidden="true" />
                                    <span className="truncate">{user.tenantId?.name || "غير محددة"}</span>
                                </p>
                            </div>
                            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/65">
                                <RoleIcon size={13} aria-hidden="true" />
                                {roleLabels[user.role] || user.role?.replace(/_/g, " ") || "غير محدد"}
                            </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default UsersListMobile
