"use client";
import { RegisterClientForm } from "@/src/types";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { User, Building2, Mail, Phone, Briefcase, MapPin } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CREATE_CLIENT = gql`
    mutation createClient($input: ClientInput) {
        createClient(input: $input) {
            name
            surname
            businessName
            role
            email
            phone
        }
    }
`

export default function CreateClientForm() {

        // Mutation to create a new user
        const [createUser] = useMutation(CREATE_CLIENT);
    
        const initialValues: RegisterClientForm = {
            name: "", 
            surname: "", 
            businessName: "", 
            role: "", 
            email: "", 
            phone: "", 
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
    
        const handleRegister = async (formData: RegisterClientForm) => {
            const { name, surname, businessName, role, email, phone } = formData;
    
            try {
                const { data } = await createUser({
                    variables: {
                        input: {
                            name,
                            surname,
                            businessName,
                            role,
                            email,
                            phone,
                        },
                    },
                });
    
                // User created successfully
                reset(initialValues); // Reset form values
                if(data.createUser) {
                    toast.success("Client created successfully 🎉");
                }
            } catch (error) {
                if (error instanceof ApolloError) {
                    toast.error(error.message);
                } else {
                    toast.error("Unexpected error");
                }
            }
        };

	return (
		<div className="max-w-3xl mx-auto mb-10 mt-5 p-[4px] bg-gradient-to-br dark:from-blue-800 from-blue-200 via-blue-500 to-blue-200 dark:to-blue-900 rounded-xl shadow-xl">
			<div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
				{/* Form Header */}
				<div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
					<div className="flex items-center space-x-3">
						<div className="bg-blue-500 p-2 rounded-full">
							<User size={20} className="text-white" />
						</div>
						<h2 className="text-white font-semibold text-lg">
							Create New Client
						</h2>
					</div>
					<p className="text-slate-300 text-sm mt-1 ml-10">
						Add a new client to your CRM system
					</p>
				</div>

				{/* Form Content */}
				<div className="p-6 lg:p-8">
					<form 
                        className="space-y-8"
                        onSubmit={handleSubmit(handleRegister)}
                        noValidate
                    >
						{/* Personal Information Section */}
						<div>
							<h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 border-b pb-2">
								Personal Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Name */}
								<div>
									<label
										htmlFor="name"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Name{" "}
										<span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<User
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="text"
											id="name"
											name="name"
											placeholder="Enter client's name"
											className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
                                            
										/>
									</div>
								</div>

								{/* Surname */}
								<div>
									<label
										htmlFor="surname"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Surname{" "}
										<span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<User
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="text"
											id="surname"
											name="surname"
											placeholder="Enter client's surname"
                                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Company Information Section */}
						<div>
							<h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 border-b pb-2">
								Company Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Business Name */}
								<div>
									<label
										htmlFor="businessName"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Business Name {" "}
                                        <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<Building2
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="text"
											id="businessName"
											name="businessName"
											placeholder="Enter company name"
											className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
										/>
									</div>
								</div>

								{/* Role */}
								<div>
									<label
										htmlFor="role"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Role
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<Briefcase
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="text"
											id="role"
											name="role"
											placeholder="Enter client's role"
											className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Information Section */}
						<div>
							<h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 border-b pb-2">
								Contact Information
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Email */}
								<div>
									<label
										htmlFor="email"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Email{" "}
										<span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<Mail
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="email"
											id="email"
											name="email"
											placeholder="Enter client's email address"
											className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
										/>
									</div>
								</div>

								{/* Phone */}
								<div>
									<label
										htmlFor="phone"
										className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
									>
										Phone
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<Phone
												size={16}
												className="text-gray-400"
											/>
										</div>
										<input
											type="text"
											id="phone"
											name="phone"
											placeholder="Enter client's phone number"
											className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
										/>
									</div>
								</div>
							</div>

                            {/* Address */}
                            <div>
                                <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 border-b pb-2 mt-8">
                                    Location
                                </h3> 
                                
                                <div className="grid grid-cols-1 mt-4">
                                    <label
                                        htmlFor="address"
                                        className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                                    >
                                        Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MapPin
                                                size={16}
                                                className="text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Enter client's address"
                                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-all"
                                        />
                                    </div>
                                </div>

                                </div>
						</div>

						{/* Form Footer */}
						<div className="pt-6 border-t border-gray-200 dark:border-gray-700">
							<div className="flex flex-col sm:flex-row sm:justify-between gap-3">
								<p className="text-sm text-gray-500 dark:text-gray-400">
									<span className="text-red-500">*</span>{" "}
									Required fields
								</p>
								<div className="flex justify-end space-x-3">
									<button
										type="button"
										className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300
                                        shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white
                                        shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										Create Client
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
