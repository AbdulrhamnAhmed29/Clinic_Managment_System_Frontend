import Pagesheaders from "../../../components/ui/Pagesheaders";
import UsersTable from "../components/UsersTable";

function UsersPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <header>
                <Pagesheaders
                    title={"المستخدمين"}
                    des={"إدارة حسابات أعضاء الفريق وصلاحياتهم."}
                />
            </header>
            <main>
                <UsersTable />
            </main>
        </div>
    );
}

export default UsersPage;
