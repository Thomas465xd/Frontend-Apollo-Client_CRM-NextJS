"use client";
import ErrorMessage from '@/components/ui/ErrorMessage';
import FormPreset from '@/components/ui/FormPreset';
import Loader from '@/components/ui/Loader';
import { GET_PRODUCT_BY_ID, GET_PRODUCTS, UPDATE_PRODUCT } from '@/src/graphql/products';
import { Product, ProductForm } from '@/src/types';
import { formatPriceToUSD } from '@/src/utils/price';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { BadgePercent, Boxes, DollarSign, PencilRuler, Tag, Text } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type EditProductFormProps = {
    productId: string;
}

export default function EditProductForm({ productId } : EditProductFormProps) {

    // Formatting States
    const [ formattedPrice, setFormattedPrice ] = useState("");
    const [formattedDiscount, setFormattedDiscount] = useState("");
    const [formattedPriceWithDiscount, setFormattedPriceWithDiscount] = useState("");
    //

    const router = useRouter();

    //* Mutations & Queries

    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { 
        variables: { id: productId }, 
        fetchPolicy: "cache-and-network",
    });
    
    const productData : Product = useMemo(() => data?.getProductById ?? {}, [data]);

    const [editProduct] = useMutation(UPDATE_PRODUCT, {
        update(cache, { data }) {
            if (!data) return;
    
            const existing = cache.readQuery<{ getProductsBySeller: Product[] }>({
                query: GET_PRODUCTS,
            });
    
            if (existing) {
                const updated = existing.getProductsBySeller.map((product) =>
                    product.id === data.updateProduct.id ? data.updateProduct : product
                );
    
                cache.writeQuery({
                    query: GET_PRODUCTS,
                    data: {
                        getProductsBySeller: updated,
                    },
                });
            }
        },
    })
    
    //* End Mutations
    
    //~ React Hook form
    const InitialValues : ProductForm = {
        name: productData.name, 
        description: productData.description || "", 
        stock: productData.stock, 
        price: productData.price, 
        discount: productData.discount || 0, 
        priceWithDiscount: productData.priceWithDiscount
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
        defaultValues : InitialValues
    })

    // Refetch form data
    useEffect(() => {
        if (productData) {
            reset({
                name: productData.name || "",
                description: productData.description || "", 
                stock: productData.stock,
                price: productData.price,
                discount: productData.discount || 0
            });
        }
    }, [data, reset, productData]);

    //~End React Hook form

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
        setValue("priceWithDiscount", discounted);
    };

    //! END Formatting Logic
    
    //? Submit Handler
    const handleEdit = async (formData: ProductForm) => {

        // Ensure values are numbers before submitting
        const { name, description, stock, price, discount, priceWithDiscount } = {
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price)
        };

        try {
            const { data } = await editProduct({
                variables: {
                    id: productId,
                    input: {
                        name, 
                        description, 
                        stock, 
                        price, 
                        discount, 
                        priceWithDiscount,
                    }
                }
            })

            if(data.updateProduct) {
                toast.success("Product updated successfully 🎉", {
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

    if(loading) return <Loader />

    if(error) {
        toast.error("Error loading client data")
        router.push("/home/clients")
    }

    if(data) return (
        <FormPreset title="Update Product" subtitle="Complete the form to update a registered Product" icon={PencilRuler}>
            <form
                className="space-y-8"
                noValidate
                suppressHydrationWarning
                onSubmit={handleSubmit(handleEdit)}
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
                                    value={formattedDiscount || `${productData.discount}%`}
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
                            {formattedPriceWithDiscount || formatPriceToUSD(productData.priceWithDiscount || 0)}
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
                                Update Product
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </FormPreset>
    )
}
