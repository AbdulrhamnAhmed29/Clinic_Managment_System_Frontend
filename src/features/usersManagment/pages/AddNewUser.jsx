import { UserPlus } from "lucide-react";
import Pagesheaders from "../../../components/ui/Pagesheaders";
import UserForm from "../components/UserForm.jsx";

function AddNewUser() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <Pagesheaders
                title="إضافة"
                title2="مستخدم"
                des="إنشاء حساب مستخدم جديد وتحديد بياناته وصلاحياته."
                icon={UserPlus}
            />
            <UserForm mode="create" />
        </div>
    );
}

export default AddNewUser;
