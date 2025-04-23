import RegisterForm from '@/components/auth/RegisterForm';
import Header from '@/components/ui/Header'
import Logo from '@/components/ui/Logo'

export default function page() {

    return (
        <>
            <Logo />

            <div className="mx-auto max-w-xl px-4 lg:px-0 mt-10">
                <Header white xl left>Create Account</Header>
                <p className="mt-2 text-sm text-gray-400">
                    Register your account in {' '}
                    <span className='font-semibold text-blue-500'>Next CRM</span>
                </p>

                <div className="mt-5 p-[4px] bg-gradient-to-br from-slate-700 via-blue-500 to-slate-800 rounded-lg shadow-xl"> 
                    <RegisterForm />
                </div>
                
                <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                    <a 
                        className='text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm'
                        href="/auth/login"
                    >
                        Already have an account? {' '}
                        <span className='font-semibold'>Log in here</span>
                    </a>

                    <a 
                        className='text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm'
                        href="/auth/forgot"
                    >
                        Forgot your password? {' '}
                        <span className='font-semibold'>Reset </span>
                    </a>
                </div>
            </div>
        </>
    )
}
