"use client"
import ErrorMessage from '@/components/ui/ErrorMessage';
import FormPreset from '@/components/ui/FormPreset'
import { UPDATE_PASSWORD } from '@/src/graphql/user';
import { ApolloError, useMutation } from '@apollo/client';
import { FingerprintIcon, Key, Pen, VerifiedIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type ResetPasswordInput = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ResetPasswordForm() {

    const [changePasssword] = useMutation(UPDATE_PASSWORD);

    const InitialValues : ResetPasswordInput = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }

    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm<ResetPasswordInput>({
        defaultValues: InitialValues
    });

    const handleUpdate = async (formData: ResetPasswordInput) => {
        const { currentPassword, newPassword } = formData;

        try {
            const { data } = await changePasssword({
                variables: {
                    input: {
                        currentPassword, 
                        newPassword, 
                    }
                }
            })
            
            reset(InitialValues);
            if (data.changePassword) {
				toast.success("Password updated successfully 🎉", {
                    theme: `${localStorage.getItem("theme")}`,
                });
			}
        } catch (error) {
            if (error instanceof ApolloError) {
                toast.error(error.message, {
                    theme: `${localStorage.getItem("theme")}`,
                });
            } else {
                toast.error("Unexpected error", {
                    theme: `${localStorage.getItem("theme")}`,
                });
            }
        }
    }

    const handleCancel = () => {
        reset();
    }

    return (
        <FormPreset title="Reset Password" subtitle="Complete the form to change your password" icon={Key}>
				<div className="p-6">
					<form 
                        className="space-y-6"
                        onSubmit={handleSubmit(handleUpdate)}
                        noValidate
                    >
						<div className="grid grid-cols-1 gap-6">
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
										type="password"
										id="currentPassword"
										placeholder="Enter your current Password"
										className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                shadow-sm transition-colors"
                                        {...register("currentPassword", { 
                                            required: "Password is required",
                                        })}
									/>
								</div>
                                {errors.currentPassword && (
                                    <ErrorMessage variant="inline">
                                        {errors.currentPassword.message}
                                    </ErrorMessage>
                                )}
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
										<Pen
											size={16}
											className="text-gray-400"
										/>
									</div>
									<input
										type="password"
										id="newPassword"
										placeholder="Enter your new Password"
										className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                shadow-sm transition-colors"
                                        {...register("newPassword", {
                                            required: "New Password cannot be empty",
                                        })}
									/>
								</div>
                                {errors.newPassword && (
                                    <ErrorMessage variant="inline">
                                        {errors.newPassword.message}
                                    </ErrorMessage>
                                )}
							</div>

                            <div>
								<label
									htmlFor="surname"
									className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
								>
									Confirm Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<VerifiedIcon
											size={16}
											className="text-gray-400"
										/>
									</div>
									<input
										type="password"
										id="confirmNewPassword"
										placeholder="Confirm your new Password"
										className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                                bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                shadow-sm transition-colors"
                                        {...register("confirmNewPassword", {
                                            required: "Confirm Password cannot be empty",
                                            validate: (value) => value === watch("newPassword") || "Passwords do not match",
                                        })}
									/>
								</div>
                                {errors.confirmNewPassword && (
                                    <ErrorMessage variant="inline">
                                        {errors.confirmNewPassword.message}
                                    </ErrorMessage>
                                )}
							</div>
						</div>

						{/* Form Footer */}
						<div className="pt-5 border-t border-gray-200 dark:border-gray-700">
							<div className="flex justify-end space-x-3">
								<button
									type="button"
									className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700
                                            shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => handleCancel()}
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
