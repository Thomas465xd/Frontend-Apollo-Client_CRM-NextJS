import { z } from "zod";

// Auth Schemas
export const registerSchema = z.object({
    name: z.string(), 
    surname: z.string(), 
    email: z.string(), 
    password: z.string(), 
    confirm_password: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(), 
    password: z.string().min(8),
})

export const forgotPasswordSchema = z.object({ 
    email: z.string().email() 
})

// Client Schemas
export const clientSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    surname: z.string(),
    businessName: z.string(),
    role: z.string().optional(), 
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(), 
})

// Product Schemas
export const productSchema = z.object({
    id: z.string(), 
    name: z.string(), 
    stock: z.number(), 
    quantity: z.number().optional(),
    price: z.number(), 
    discount: z.number().optional(), 
    priceWithDiscount: z.number().optional(), 
    description: z.string().optional(), 
})

export const productInputSchema = productSchema.pick({
    name: true, 
    stock: true, 
    price: true, 
    discount: true, 
    description: true, 
    priceWithDiscount: true
})

// Order Schemas
export const orderSchema = z.object({
    id: z.string(),
    total: z.number(), 
    totalWithDiscount: z.number().optional(),
    client: z.object({
        id: z.string(),
        name: z.string(),
        surname: z.string(),
        businessName: z.string(),
        role: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
    status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']),
    seller: z.string(),
    order: z.array(productSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const selectClient = z.object({
    id: z.string(), 
    name: z.string(),
})

// Analytics Schemas
export const bestSellerSchema = z.object({
    seller: z.object({
        name: z.string(),
        email: z.string(),
    }),
    totalOrders: z.number(),
    totalSales: z.number(),
})

export const bestClientSchema = z.object({
    client: z.object({
        name: z.string(), 
        email: z.string(),
    }),
    totalOrders: z.number(),
    totalSpent: z.number(),
})

// Auth Types
export type RegisterUserForm = z.infer<typeof registerSchema>
export type LoginUserForm = z.infer<typeof loginSchema>
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

// Client Types
export type RegisterClientForm = z.infer<typeof clientSchema>
export type ClientInput = z.infer<typeof clientSchema>

// Product Types
export type Product = z.infer<typeof productSchema>
export type ProductForm = z.infer<typeof productInputSchema>

// Order Types
export type Order = z.infer<typeof orderSchema>

// Analytics Types
export type BestSeller = z.infer<typeof bestSellerSchema>
export type BestClient = z.infer<typeof bestClientSchema>