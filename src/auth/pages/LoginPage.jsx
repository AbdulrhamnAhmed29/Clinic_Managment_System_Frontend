import LoginForm from "../components/LoginForm";
import LoginPageHeader from '../components/LoginPageHeader';

function LoginPage() {
    return (
        <div className="relative flex h-svh min-h-0 flex-col justify-between overflow-hidden bg-[#080a08] text-white sm:min-h-screen sm:h-auto">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(123,234,0,0.11),transparent_42%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]"
            />
            {/* Header  */}
            <header className="relative z-10">
                <LoginPageHeader />
            </header>
            {/* Main*/}
            <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-2 sm:py-16">
                <section
                    aria-labelledby="login-heading"
                    className=" px-4 md:w-[500px] md:px-0"
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