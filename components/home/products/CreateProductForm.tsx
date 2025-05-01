"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormPreset from "@/components/ui/FormPreset";
import { CREATE_PRODUCT, GET_PRODUCTS } from "@/src/graphql/products";
import { Product, ProductForm } from "@/src/types";
import { formatPriceToUSD } from "@/src/utils/price";
import { ApolloError, useMutation } from "@apollo/client";
import { BadgePercent, Boxes, DollarSign, PackageCheck, Tag, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProductForm() {

    // Formatting States
    const [ formattedPrice, setFormattedPrice ] = useState("");
    const [formattedDiscount, setFormattedDiscount] = useState("");
    const [formattedPriceWithDiscount, setFormattedPriceWithDiscount] = useState("");
    //

    const router = useRouter();

    //* Mutations
    const [ createProduct ] = useMutation(CREATE_PRODUCT, {
        update(cache, { data }) {
            if(!data) return;

            // Read the existing data
            const existing = cache.readQuery<{ getProductsBySeller: Product[] }>({
                query: GET_PRODUCTS,
            });
    
            // Update the cache with the new client
            // If the query exists in the cache, update it with the new client
            if (existing) {
                // We rewrite the cache. We NEVER modify the cache directly.
                cache.writeQuery({
                    query: GET_PRODUCTS,

                    //~ We take a copy of the existing data and then we ADD the new data
                    data: {
                        getProductsBySeller: [...existing.getProductsBySeller, data.createProduct],
                    },
                });
            }
        }
    });

    const InitialValues : ProductForm = {
        name: "", 
        description: "", 
        stock: 0, 
        price: 0, 
        discount: 0, 
    }

    //* End Mutations

    // React Hook form
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
        defaultValues : InitialValues
    })

    //! Formatting Logic (Probably this is not the right way to do it)
    const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9.]/g, "");
        let numeric = parseFloat(raw);
    
        if (isNaN(numeric)) {
            setValue("discount", 0);
            setFormattedDiscount("");
            return;
        }
    
        // Clamp the value immediately
        if (numeric > 100) numeric = 100;
        if (numeric < 0) numeric = 0;
    
        // Update form and UI
        setValue("discount", numeric);
        setFormattedDiscount(numeric.toString()); // This prevents typing >100

        const price = getValues("price") ?? 0;
        updatePriceWithDiscount(price, numeric);
    };
    
    const handleDiscountBlur = () => {
        // Only show % when not focused
        if (formattedDiscount !== "") {
            setFormattedDiscount((prev) => `${prev}%`);
        }
    };
    
    const handleDiscountFocus = () => {
        // Remove % on focus so it can be edited
        setFormattedDiscount((prev) => prev.replace('%', ''));
    };

    const updatePriceWithDiscount = (rawPrice: number, rawDiscount: number) => {
        const price = isNaN(rawPrice) ? 0 : rawPrice;
        const discount = isNaN(rawDiscount) ? 0 : Math.min(Math.max(rawDiscount, 0), 100);
        const discounted = price - (price * discount / 100);

        setFormattedPriceWithDiscount(formatPriceToUSD(discounted));
    };

    //! END Formatting Logic
    
    //? Submit Handler
    const handleRegister = async (formData: ProductForm) => {

        // Ensure values are numbers before submitting
        const { name, description, stock, price, discount } = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        };

        try {
            const { data } = await createProduct({
                variables: {
                    input: {
                        name, 
                        description, 
                        stock, 
                        price, 
                        discount, 
                    }
                }
            })

            reset(InitialValues); // Reset form values
            if(data.createProduct) {
                toast.success("Product created successfully 🎉", {
                    theme: `${localStorage.getItem("theme")}`,
                });

                // redirect to login page
                router.push("/home/products");
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

    //? End Submit Handler

    return (
        <FormPreset title="Create Product" subtitle="Complete the form to register a new Product" icon={PackageCheck}>
            <div className="p-6 lg:p-8">
                <form
                    className="space-y-8"
                    noValidate
                    suppressHydrationWarning
                    onSubmit={handleSubmit(handleRegister)}
                >
                    <div className="">
                        <h3 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-4 border-b pb-2">
                            Product Info
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="">
                                <label 
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                                >
                                    Name {" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-5">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Tag
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        id="name"
                                        placeholder="Enter Product Name"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        shadow-sm transition-all"
                                        {...register("name", {
                                            required: "Name cannot be empty", 
                                        })}
                                    />
                                </div>
                                {errors.name && (
                                    <ErrorMessage variant="inline">
                                        {errors.name.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <div className="">
                                <label 
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                                >
                                    Stock Available {" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-5">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Boxes
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <input 
                                        type="number" 
                                        id="stock"
                                        placeholder="Enter Product Stock"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        shadow-sm transition-all"
                                        {...register("stock", {
                                            required: "Stock cannot be empty",
                                            validate: {
                                                positive: (value) => value > 0 || "Stock must be greater than 0",
                                                integer: (value) => Number.isInteger(Number(value)) || "Stock must be an integer",
                                            }
                                        })}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/[^0-9]/g, "");
                                            const numeric = parseFloat(raw);
                                            if (!isNaN(numeric)) {
                                                setValue("stock", numeric);
                                            }
                                        }}
                                    />
                                </div>
                                {errors.stock && (
                                    <ErrorMessage variant="inline">
                                        {errors.stock.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <div className="">
                                <label 
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                                >
                                    Price (USD) {" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-5">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <DollarSign
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <input 
                                        type="number" 
                                        id="price"
                                        placeholder="Enter Product Price (USD)"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        shadow-sm transition-all"
                                        {...register("price", {
                                            required: "Price cannot be empty", 
                                            validate: (value) => value > 0 || "Price must be greater than 0",
                                            valueAsNumber: true
                                        })}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/[^0-9.]/g, "");
                                            const numeric = parseFloat(raw);
                                        
                                            if (!isNaN(numeric)) {
                                                setValue("price", numeric);
                                                setFormattedPrice(formatPriceToUSD(numeric));
                                        
                                                // Recalculate discount price if discount exists
                                                const currentDiscount = getValues("discount") ?? 0;
                                                updatePriceWithDiscount(numeric, currentDiscount);
                                            } else {
                                                setFormattedPrice("");
                                                setValue("price", 0);
                                                updatePriceWithDiscount(0, getValues("discount") ?? 0);
                                            }
                                        }}              
                                    />
                                </div>
                                {errors.price && (
                                    <ErrorMessage variant="inline">
                                        {errors.price.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <div className="">
                                <label 
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                                >
                                    Discount (%) {" "}
                                </label>
                                <div className="relative mb-5">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <BadgePercent
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <input 
                                        type="text"
                                        inputMode="numeric"
                                        id="discount"
                                        placeholder="Enter Discount Percentage"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                        bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                        shadow-sm transition-all"
                                        value={formattedDiscount}
                                        onChange={handleDiscountChange}
                                        onBlur={handleDiscountBlur}
                                        onFocus={handleDiscountFocus}
                                    />

                                    <input
                                        type="hidden"
                                        {...register("discount", {
                                            validate: (value) => {
                                                if (value === undefined) {
                                                    return "Discount is required";
                                                } return value === 0 || (value > 0 && value <= 100) || "Discount must be between 0% and 100%";
                                            }
                                        })}
                                    />
                                </div>
                                {errors.discount && (
                                    <ErrorMessage variant="inline">
                                        {errors.discount.message}
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>

                        <div className="">
                            <label 
                                htmlFor="name"
                                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                            >
                                Description {" "}
                            </label>
                            <div className="relative mb-5">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Text
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    id="description"
                                    placeholder="Enter Product Description"
                                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                                    bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm transition-all"
                                    {...register("description", {
                                        required: false,
                                    })}
                                />
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Price with discount: {" "}
                            <span className="text-blue-500 text-md font-semibold">
                                {formattedPriceWithDiscount}
                            </span>
                        </p>
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
                                    shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                                >
                                    Register Product
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FormPreset>
    )
}
