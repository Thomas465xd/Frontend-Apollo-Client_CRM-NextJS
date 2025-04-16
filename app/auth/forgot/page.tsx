import Header from '@/components/ui/Header'
import Logo from '@/components/ui/Logo'
import React from 'react'

export default function page() {
    return (
        <>
            <Logo />
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mt-10">
                <Header>Forgot Password</Header>
            </div>
            <div className="flex flex-col items-center gap-5 mt-5">
                <a 
                    className='text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm'
                    href="/auth/register"
                >
                    Don&apos;t have an account? {' '}
                    <span className='font-semibold'>Sign Up </span>
                </a>

                <a 
                    className='text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm'
                    href="/auth/login"
                >
                    Already have an account? {' '}
                    <span className='font-semibold'>Log in here</span>
                </a>
            </div>
        </>
    )
}
