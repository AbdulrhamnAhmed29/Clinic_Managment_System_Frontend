import {
    CalendarDays,
    ChartNoAxesCombined,
    LayoutDashboard,
    Settings2,
    UsersRound,
} from "lucide-react";

export const sidebarItems = [
    { label: "لوحة التحكم", to: "/dashboard", icon: LayoutDashboard, end: true },
    { label: "ادارة الحجوزات", to: "/dashboard/clients", icon: UsersRound },
    { label: "ادارة العيادات", to: "/dashboard/appointments", icon: CalendarDays },
    // { label: " ", to: "/dashboard/services", icon: Stethoscope },
    { label: "التقارير", to: "/dashboard/reports", icon: ChartNoAxesCombined },
    { label: "الإعدادات", to: "/dashboard/settings", icon: Settings2 },
];
