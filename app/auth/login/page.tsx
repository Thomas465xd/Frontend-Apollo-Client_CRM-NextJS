import Header from '@/components/ui/Header'
import Logo from '@/components/ui/Logo'
import React from 'react'

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
                                placeholder='Enter your registered account email'
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label 
                                htmlFor="password"
                                className='block text-gray-700 text-sm font-bold mb-2'
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Enter your registered account password'
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="border-t rounded border-gray-400"></div>
                        <p className="text-sm text-gray-400">
                            <span className="text-red-500">*</span> To Login you must have your registered email address confirmed 
                        </p>

                        <input
                            type="submit"
                            value='Login'
                            className="bg-slate-800 hover:bg-slate-900 w-full p-3  text-white font-black  text-md cursor-pointer rounded"
                        />
                    </div>
                </form>
                
                <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                    <a 
                        className='text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm'
                        href="/auth/register"
                    >
                        Don&apos;t have an account? {' '}
                        <span className='font-semibold'>Sign Up here</span>
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
