import React from 'react';
import LoginForm from "../components/LoginForm";
import LoginPageHeader from '../components/LoginPageHeader';

function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Header  */}
            <header>
                <LoginPageHeader />
            </header>
            {/* Main*/}
            <main className="flex-1 flex items-center justify-center">
                <section aria-labelledby="login-heading">
                    <h1 id="login-heading" className="sr-only">تسجيل الدخول</h1>
                    <LoginForm />
                </section>
            </main>
            {/* Footer*/}
            <footer className="py-4 text-center text-sm text-gray-500">
                <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default LoginPage;