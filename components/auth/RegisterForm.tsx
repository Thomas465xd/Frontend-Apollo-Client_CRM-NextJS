"use client";
import { RegisterUserForm } from "@/src/types";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import { useMutation, gql, ApolloError } from "@apollo/client";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const CREATE_USER = gql`
	mutation createUser($input: UserInput) {
		createUser(input: $input) {
			id
			name
			surname
			email
		}
	}
`;

export default function RegisterForm() {
	// Mutation to create a new user
	const [createUser] = useMutation(CREATE_USER, {});

	const initialValues: RegisterUserForm = {
		name: "",
		surname: "",
		email: "",
		password: "",
		confirm_password: "",
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
	});

	const handleRegister = async (formData: RegisterUserForm) => {
		const { name, surname, email, password } = formData;

		try {
			const { data } = await createUser({
				variables: {
					input: {
						name: name,
						surname: surname,
						email: email,
						password: password,
					},
				},
			});

			// User created successfully
            reset(initialValues); // Reset form values
            if(data.createUser) {
                Swal.fire({
                    title: "Success 🚀", 
                    text: "Your account is now registered, check your email for confirmation ⬇️",
                    icon: "success",
                    theme: "auto"
                }).then(() => {
                    redirect("/auth/login"); // Redirect to login page
                })
            }
		} catch (error) {
			if (error instanceof ApolloError) {
				toast.error(error.message);
			} else {
				toast.error("Unexpected error");
			}
		}
	};

	const password = watch("password");

	//if (loading) return <Loader />;

	return (
		<form
			className="space-y-5 bg-white shadow-lg rounded-lg p-6 lg:p-10 border border-gray-200"
			onSubmit={handleSubmit(handleRegister)}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div className="space-y-2">
					<label
						htmlFor="name"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						placeholder="Enter your name"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
						{...register("name", {
							required: "Name is required",
						})}
					/>
					{errors.name && (
						<ErrorMessage variant="inline">
							{errors.name.message}
						</ErrorMessage>
					)}
				</div>

				<div className="space-y-2">
					<label
						htmlFor="surname"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Surname
					</label>
					<input
						type="surname"
						id="surname"
						placeholder="Enter your surname"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
						{...register("surname", {
							required: "Surname is required",
						})}
					/>
					{errors.surname && (
						<ErrorMessage variant="inline">
							{errors.surname.message}
						</ErrorMessage>
					)}
				</div>
			</div>

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
						placeholder="Enter your email address"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						})}
					/>
					{errors.email && (
						<ErrorMessage>{errors.email.message}</ErrorMessage>
					)}
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
						placeholder="Create a secure password for your account"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message:
									"Password must be at least 8 characters",
							},
						})}
					/>
					{errors.password && (
						<ErrorMessage>{errors.password.message}</ErrorMessage>
					)}
				</div>

				<div className="space-y-2">
					<label
						htmlFor="confirm_password"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Repeat Password
					</label>
					<input
						type="password"
						id="confirm_password"
						placeholder="Repeat your password"
						className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
						{...register("confirm_password", {
							required: "Repeat Password is required",
							validate: (value) =>
								value === password || "Passwords do not match",
						})}
					/>
					{errors.confirm_password && (
						<ErrorMessage>
							{errors.confirm_password.message}
						</ErrorMessage>
					)}
				</div>

				<div className="border-t rounded border-gray-400"></div>

				<p className="text-sm text-gray-400">
					<span className="text-red-500">*</span> This data will be
					used to create your account in Next CRM
				</p>

				<input
					type="submit"
					value="Register"
					className="bg-slate-800 hover:bg-slate-900 w-full p-3  text-white font-black  text-md cursor-pointer rounded transition-colors"
				/>
			</div>
		</form>
	);
}
