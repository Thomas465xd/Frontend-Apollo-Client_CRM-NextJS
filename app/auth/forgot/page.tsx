import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import Header from '@/components/ui/Header'
import Logo from '@/components/ui/Logo'
import React from 'react'

export default function page() {
    return (
        <>
            <Logo />

            <div className="mx-auto max-w-xl px-4 lg:px-0 mt-10">
                <Header white xl left>Reset Password</Header>
                <p className="mt-2 text-sm text-gray-400">
                    We will send you an email with a link to {' '}
                    <span className='font-semibold text-blue-500'>reset your password</span>
                </p>

                <div className="mt-5 p-[4px] bg-gradient-to-br from-slate-700 via-blue-500 to-slate-800 rounded-lg shadow-xl">
                    <ForgotPasswordForm />
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
                        href="/auth/register"
                    >
                        Don&apos;t have an account? {' '}
                        <span className='font-semibold'>Register Here </span>
                    </a>
                </div>
            </div>
        </>
    )
}