import { CalendarDays, Clock3, UsersRound } from "lucide-react";
import Cards from "../components/ui/cards";

const summaryCards = [
    { title: "إجمالي الحجوزات", icon: CalendarDays },
    { title: "العيادات", icon: UsersRound },
    { title: "المواعيد القادمة", icon: Clock3 },
];

function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <header>
                <p className="mb-2 text-sm font-semibold text-lime-400">لوحة التحكم</p>
                <h1 className="text-2xl font-black leading-relaxed text-white sm:text-3xl">
                    إدارة <span className="gradient-word">رعايتك</span> في مكان واحد
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/55">
                    نظرة عامة على الحجوزات والعيادات والمواعيد.
                </p>
            </header>

            <main>
                <Cards
                    content={summaryCards}
                />
            </main>
        </div>
    );
}

export default DashboardPage;
