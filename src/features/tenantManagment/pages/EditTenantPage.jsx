import { Pencil } from "lucide-react";
import Pagesheaders from "../../../components/ui/Pagesheaders";
import TenantForm from "../components/TenantForm.jsx";

function EditTenantPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <Pagesheaders
                title="تعديل"
                title2="عيادة"
                des="حدّث بيانات العيادة ومعلومات التواصل والحالة."
                icon={Pencil}
            />
            <TenantForm mode="edit" />
        </div>
    );
}

export default EditTenantPage;
