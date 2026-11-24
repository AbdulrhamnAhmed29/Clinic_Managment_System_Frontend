import UsersForm from "../components/usersForm"
import Pagesheaders from "../../../components/ui/Pagesheaders"


function AddNewUser() {

    return (
        <>
            <header>
                <Pagesheaders
                    title="إضافة "
                    title2="مستخدم "
                    des="إنشاء حساب مستخدم جديد وتحديد بياناته وصلاحياته."
                />
            </header>
            <main>
                <UsersForm />
            </main>
        </>
    )
}

export default AddNewUser
