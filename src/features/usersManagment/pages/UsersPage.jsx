import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import Pagesheaders from "../../../components/ui/Pagesheaders";
import UsersTable from "../components/UsersTable";
import { Link } from "react-router-dom";

function UsersPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <header className="flex  gap-3 flex-row justify-between items-center">
                <Pagesheaders
                    title={"ادارة"}
                    title2={"المستخدمين"}
                    des={"إدارة حسابات أعضاء الفريق وصلاحياتهم."}
                />

                <Button>
                    <Link to={"/dashboard/add"} className="flex gap-1 items-center" >
                        <p className="hidden sm:block">اضافة مستخدم جديد</p>
                        <Plus className="w-4 h-4 " />

                    </Link>
                </Button>
            </header>

            <main>
                <UsersTable />
            </main>
        </div>
    );
}

export default UsersPage;
