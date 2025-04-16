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

                <form 
                    className="mt-5 space-y-5 bg-white shadow-lg rounded-lg p-6 lg:p-10 border border-gray-200"
                >
                    <div className="grid grid-cols-1 gap-5">

                        <div className="space-y-2">
                            <label 
                                htmlFor="email"
                                className='block text-gray-700 text-sm font-bold mb-2'
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Enter your account email'
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="border-t rounded border-gray-400"></div>

                        <p className="text-sm text-gray-400">
                            <span className="text-red-500">*</span> An email will be sent to you with further instructions
                        </p>

                        <input
                            type="submit"
                            value='Send Instructions'
                            className="bg-slate-800 hover:bg-slate-900 w-full p-3  text-white font-black  text-md cursor-pointer rounded"
                        />
                    </div>
                </form>
                
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