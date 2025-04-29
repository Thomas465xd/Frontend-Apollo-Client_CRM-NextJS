import FormPreset from '@/components/ui/FormPreset'
import { FingerprintIcon, Key } from 'lucide-react'
import React from 'react'

export default function ResetPasswordForm() {
    return (
        <FormPreset title="Reset Password" subtitle="Complete the form to change your password" icon={Key}>
				<div className="p-6">
					<form className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="name"
									className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
								>
									Current Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FingerprintIcon
											size={16}
											className="text-gray-400"
										/>
									</div>
									<input
										type="text"
										id="name"
										name="name"
										placeholder="Enter your name"
										className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                shadow-sm transition-colors"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="surname"
									className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
								>
									New Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<FingerprintIcon
											size={16}
											className="text-gray-400"
										/>
									</div>
									<input
										type="text"
										id="surname"
										name="surname"
										placeholder="Enter your surname"
										className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                shadow-sm transition-colors"
									/>
								</div>
							</div>
						</div>

						{/* Form Footer */}
						<div className="pt-5 border-t border-gray-200 dark:border-gray-700">
							<div className="flex justify-end space-x-3">
								<button
									type="button"
									className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700
                                            shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white
                                            shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Confirm
								</button>
							</div>
						</div>
					</form>
				</div>
        </FormPreset>
    )
}
