import LoginForm from "../components/LoginForm";
import LoginPageHeader from '../components/LoginPageHeader';

function LoginPage() {
    return (
        <div className="app-shell login-page relative flex h-dvh min-h-0 flex-col overflow-hidden text-white">
            {/* Header  */}
            <header className="relative z-10">
                <LoginPageHeader />
            </header>
            {/* Main*/}
            <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-1 sm:py-3 lg:py-4">
                <section
                    aria-labelledby="login-heading"
                    className="w-full px-2 sm:max-w-[420px] sm:px-0"
                >
                    <LoginForm />
                </section>
            </main>
            {/* Footer*/}
            <footer className="relative z-10 shrink-0 border-t border-white/5 py-1.5 text-center text-[0.6rem] text-white/35 sm:py-2 sm:text-xs">
                <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default LoginPage;