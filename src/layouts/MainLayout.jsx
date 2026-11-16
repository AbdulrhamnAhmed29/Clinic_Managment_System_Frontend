import { Outlet } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import Headers from "./Header";

function MainLayout() {
    return (
        <div dir="rtl" className="app-shell flex h-svh overflow-hidden font-sans text-white">
            <DesktopSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <header>
                    <Headers />
                </header>
                <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-7 sm:py-8 sm:pb-28 lg:pb-8">
                    <Outlet />
                </main>
            </div>
            <MobileSidebar />
        </div>
    );
}

export default MainLayout;