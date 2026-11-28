import {
    CalendarDays,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings2,
    UserRoundCog,
    UsersRound,
} from "lucide-react";
import { PERMISSIONS } from "../shared/authorization/permissions";

export const sidebarItems = [
    { label: "لوحة التحكم", to: "/dashboard", icon: LayoutDashboard, end: true },
    { label: "ادارة الحجوزات", to: "/dashboard/clients", icon: UsersRound, permission: PERMISSIONS.TICKETS_READ },
    { label: "ادارة العيادات", to: "/dashboard/clinics", icon: CalendarDays, permission: PERMISSIONS.CLINICS_READ },
    { label: "إدارة المستخدمين", to: "/dashboard/users", icon: UserRoundCog, permission: PERMISSIONS.USERS_READ },
    // { label: " ", to: "/dashboard/services", icon: Stethoscope },
    { label: "التقارير", to: "/dashboard/reports", icon: ChartNoAxesCombined, permission: PERMISSIONS.REPORTS_READ },
    { label: "الإعدادات", to: "/dashboard/settings", icon: Settings2 },
];
