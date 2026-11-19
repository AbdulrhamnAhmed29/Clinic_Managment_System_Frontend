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
            <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-4 py-6 lg:flex-row lg:px-8">
          
                <section
                    aria-labelledby="login-heading"
                    className="w-full px-2 sm:max-w-[420px] sm:px-0 lg:max-w-[480px]"
                >
                    <LoginForm />
                </section>
            </main>

        </div>
    );
}

export default LoginPage;