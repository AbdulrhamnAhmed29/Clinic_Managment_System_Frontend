import LoginForm from "../components/LoginForm";
import LoginPageHeader from '../components/LoginPageHeader';

function LoginPage() {
    return (
        <div className="app-shell relative flex min-h-svh flex-col justify-between overflow-hidden text-white sm:h-svh sm:min-h-0">
            {/* Header  */}
            <header className="relative z-10">
                <LoginPageHeader />
            </header>
            {/* Main*/}
            <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-2 sm:py-4 lg:py-6">
                <section
                    aria-labelledby="login-heading"
                    className="w-full px-4 sm:max-w-[500px] sm:px-0"
                >
                    <h1 id="login-heading" className="sr-only">تسجيل الدخول</h1>
                 <LoginForm/>
                </section>
            </main>
            {/* Footer*/}
            <footer className="relative z-10 border-t border-white/5 py-2 text-center text-[0.65rem] text-white/35 sm:py-4 sm:text-xs">
                <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default LoginPage;