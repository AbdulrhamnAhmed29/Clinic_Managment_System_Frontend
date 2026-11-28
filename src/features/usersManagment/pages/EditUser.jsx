import { Pencil } from "lucide-react";
import Pagesheaders from "../../../components/ui/Pagesheaders";
import UserForm from "../components/UserForm.jsx";

function EditUser() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <Pagesheaders
                title="تعديل"
                title2="مستخدم"
                des="تحديث بيانات المستخدم وصلاحياته."
                icon={Pencil}
            />
            <UserForm mode="edit" />
        </div>
    );
}

export default EditUser;
