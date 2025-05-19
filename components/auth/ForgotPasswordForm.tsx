"use client"
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import type { ForgotPasswordForm } from "@/src/types";

export default function ForgotPasswordForm() {

    const initialValues : ForgotPasswordForm = {
        email: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ 
        defaultValues: initialValues
    })

    const handleForgotPassword = () => {
        reset(initialValues)
    }

	return (
		<form 
            className="space-y-5 bg-white shadow-lg rounded-lg p-6 lg:p-10 border border-gray-200"
            onSubmit={handleSubmit(handleForgotPassword)}
            noValidate
            suppressHydrationWarning
        >
			<div className="grid grid-cols-1 gap-5">
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your account email"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        {...register("email", {
                            required: "Email is required", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
					/>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<div className="border-t rounded border-gray-400"></div>

				<p className="text-sm text-gray-400">
					<span className="text-red-500">*</span> An email will be
					sent to you with further instructions
				</p>

				<input
					type="submit"
					value="Send Instructions"
					className="bg-slate-800 hover:bg-slate-900 w-full p-3  text-white font-black  text-md cursor-pointer rounded transition-colors"
				/>
			</div>
		</form>
	);
}
