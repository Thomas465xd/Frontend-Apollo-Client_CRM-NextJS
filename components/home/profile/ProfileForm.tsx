"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormPreset from "@/components/ui/FormPreset";
import Loader from "@/components/ui/Loader";
import { GET_PROFILE, UPDATE_USER } from "@/src/graphql/user";
import { UpdateUser } from "@/src/types";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { User, Mail, Building2, Briefcase, Phone, MapPin, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfileForm() {
    const router = useRouter();

    const { data, loading, error } = useQuery<{getUser: UpdateUser}>(GET_PROFILE);

    const userData = useMemo(() => data?.getUser, [data]);

    const [updateUser] = useMutation(UPDATE_USER, {
        update(cache, { data }) {
            if (!data) return;
    
            const existing = cache.readQuery<{ getUser: UpdateUser }>({
                query: GET_PROFILE,
            });
    
            if (existing) {
                cache.writeQuery({
                    query: GET_PROFILE,
                    data: {
                        getUser: data.updateUser,
                    },
                });
            }
        },
    });

    // Initialize with empty default values
    const initialValues: UpdateUser = {
        name: "",
        surname: "",
        email: "",
        role: "", 
        businessName: "", 
        phone: "", 
        address: "", 
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUser>({
        defaultValues: initialValues,
    });

    // Refetch form data
    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name || "",
                surname: userData.surname || "",
                email: userData.email || "",
                role: userData.role || "",
                businessName: userData.businessName || "",
                phone: userData.phone || "",
                address: userData.address || "",
            });
        }
    }, [userData, reset]); // Fixed: removed clientData and replaced with userData

    const handleUpdate = async (formData: UpdateUser) => {
        const { name, surname, email, role, businessName, phone, address } = formData;

        // Implementation of update logic
        try {
            const { data } = await updateUser({
                variables: { 
					input: {
						name,
						surname,
						businessName,
						role,
						email,
						phone,
						address,
					},
				},
			});

			if (data?.updateUser) {
				toast.success("Profile updated successfully 🎉", {
                    theme: `${localStorage.getItem("theme")}`,
                });
			}
        }  catch (error) {
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

    if (loading) return <Loader />;

    if(error) {
        toast.error("Error loading profile data");
        router.push("/home");
        return null; // Added explicit return for this case
    }

    if(data) return (
        <FormPreset title="Edit Profile" subtitle="Update your profile information" icon={UserPen}>
            <form 
                className="space-y-8"
                onSubmit={handleSubmit(handleUpdate)}
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
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("name", {
                                        required: "User name is required",
                                    })}
                                />
                            </div>

                            {errors.name && <ErrorMessage variant="inline">{errors.name.message}</ErrorMessage>}
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
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="surname"
                                    placeholder="Enter your surname"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("surname", {
                                        required: "Surname cannot be empty", 
                                    })}
                                />
                            </div>
                            {errors.surname && <ErrorMessage variant="inline">{errors.surname.message}</ErrorMessage>}
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
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Building2
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="businessName"
                                    placeholder="Enter your company name"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("businessName", {
                                        required: false 
                                    })}
                                />
                            </div>
                            {errors.businessName && <ErrorMessage variant="inline">{errors.businessName.message}</ErrorMessage>}
                        </div>

                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                            >
                                Role
                            </label>
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Briefcase
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="role"
                                    placeholder="Enter your company role"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("role", {
                                        required: false, 
                                    })}
                                />
                            </div>
                            {errors.role && <ErrorMessage variant="inline">{errors.role.message}</ErrorMessage>}
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
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("email", {
                                        required: "Email cannot be empty",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }, 
                                    })}
                                />
                            </div>
                            {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                            >
                                Phone
                            </label>
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Phone
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("phone", {
                                        pattern: {
                                            value: /^(?:\+?56)?(?:9\d{8})$/,
                                            message: "Invalid phone number. Must be 9 digits long and start with 9 or +56",
                                        }, 
                                    })}
                                />
                            </div>
                            {errors.phone && <ErrorMessage variant="inline">{errors.phone.message}</ErrorMessage>}
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
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MapPin
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Enter your address"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("address", {
                                        required: false, 
                                    })}
                                />
                            </div>
                            {errors.address && <ErrorMessage variant="inline">{errors.address.message}</ErrorMessage>}
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
                            {/* Form Footer 
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300
                                shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            */}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white
                                shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </FormPreset>
    );
}