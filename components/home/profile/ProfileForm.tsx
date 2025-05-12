"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormPreset from "@/components/ui/FormPreset";
import Loader from "@/components/ui/Loader";
import { GET_PROFILE } from "@/src/graphql/user";
import { UpdateUser } from "@/src/types";
import { useQuery } from "@apollo/client";
import { User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfileForm() {
    const router = useRouter();

    const { data, loading, error } = useQuery<{getUser: UpdateUser}>(GET_PROFILE);

    const userData = useMemo(() => data?.getUser, [data]);

    // Initialize with empty default values
    const initialValues: UpdateUser = {
        name: "",
        surname: "",
        email: "",
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
            });
        }
    }, [userData, reset]); // Fixed: removed clientData and replaced with userData

    const handleUpdate = async (formData: UpdateUser) => {
        const { name, surname, email } = formData;
        // Implementation of update logic
    }

    if (loading) return <Loader />;

    if(error) {
        toast.error("Error loading profile data");
        router.push("/home");
        return null; // Added explicit return for this case
    }

    return (
        <FormPreset title="Edit Profile" subtitle="Update your profile information" icon={User}>
            <div className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit(handleUpdate)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                            >
                                Name
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
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-colors"
                                    {...register("name", {
                                        required: "Name cannot be empty",
                                    })}
                                />
                                {errors.name && (
                                    <ErrorMessage variant="inline">
                                        {errors.name.message}
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="surname"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                            >
                                Surname
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
                                    placeholder="Enter your surname"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                            bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                            shadow-sm transition-colors"
                                    {...register("surname")}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                        >
                            Email
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
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        shadow-sm transition-colors"
                                {...register("email")}
                            />
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700
                                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white
                                        shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </FormPreset>
    );
}