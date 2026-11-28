import { Building2 } from "lucide-react";
import Pagesheaders from "../../../components/ui/Pagesheaders";
import TenantForm from "../components/TenantForm.jsx";

function AddTenantPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <Pagesheaders
                title="إضافة"
                title2="عيادة"
                des="أضف عيادة جديدة وحدد معلومات التواصل والحالة."
                icon={Building2}
            />
            <TenantForm mode="create" />
        </div>
    );
}

export default AddTenantPage;
