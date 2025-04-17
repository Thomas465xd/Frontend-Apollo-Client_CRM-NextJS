"use client"
import { LoginUserForm } from "@/src/types";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";

export default function LoginForm() {

    const initialValues : LoginUserForm = {
        email: "", 
        password: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const handleLogin = (formData: LoginUserForm) => {
        console.log(formData)
    }

	return (
		<form 
            className="space-y-5 bg-white rounded-lg p-6 lg:p-10"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
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
						placeholder="Enter your registered account email"
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

				<div className="space-y-2">
					<label
						htmlFor="password"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Enter your registered account password"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
					/>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<div className="border-t rounded border-gray-400"></div>
				<p className="text-sm text-gray-400">
					<span className="text-red-500">*</span> To Login you must
					have your registered email address confirmed
				</p>

				<input
					type="submit"
					value="Login"
					className="bg-slate-800 hover:bg-slate-900 w-full p-3 text-white font-black text-md cursor-pointer rounded transition-colors"
				/>
			</div>
		</form>
	);
}
