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

export const userSchema = z.object({
    id: z.string().optional(), 
    name: z.string(), 
    surname: z.string(), 
    email: z.string().email(),
    phone: z.string().optional(), 
    businessName: z.string().optional(), 
    role: z.string().optional(), 
    address: z.string().optional(),
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

export const clientTableSchema = z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    businessName: z.string(),
    role: z.string().optional(), 
    email: z.string().email(),
    phone: z.string().default("Not Provided"),
    address: z.string().default("Not Provided"), 
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
        surname: z.string(),
        email: z.string(),
    }),
    totalOrders: z.number(),
    totalSales: z.number(),
})

export const bestClientSchema = z.object({
    client: z.object({
        name: z.string(), 
        surname: z.string(),
        email: z.string(),
    }),
    totalOrders: z.number(),
    totalSpent: z.number(),
})

const recentOrderSchema = z.object({
    createdAt: z.string(),
    total: z.number(),
    status: z.string(),
    client: z.object({
        name: z.string().nullable(),
    }),
});

const recentClientSchema = z.object({
    name: z.string(),
    createdAt: z.string(),
    email: z.string().email(),
});

const recentProductSchema = z.object({
    name: z.string(),
    createdAt: z.string(),
    price: z.number(),
});

export const getRecentActivitySchema = z.object({
    getRecentActivity: z.array(
        z.union([
            recentOrderSchema,
            recentClientSchema,
            recentProductSchema,
        ])
    ),
});

export const getGeneralActivitySchema = z.object({
    totalOrders: z.number(),
    pendingOrders: z.number(),
    completedOrders: z.number(),
    cancelledOrders: z.number(),
    totalRevenue: z.number(),
    monthlyRevenue: z.number(),
    totalClients: z.number(),
    totalProducts: z.number(),
})


// Auth Types
export type RegisterUserForm = z.infer<typeof registerSchema>
export type LoginUserForm = z.infer<typeof loginSchema>
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>
export type UpdateUser = z.infer<typeof userSchema>

// Client Types
export type RegisterClientForm = z.infer<typeof clientSchema>
export type ClientInput = z.infer<typeof clientSchema>
export type ClientTableResume = z.infer<typeof clientTableSchema>

// Product Types
export type Product = z.infer<typeof productSchema>
export type ProductForm = z.infer<typeof productInputSchema>

// Order Types
export type Order = z.infer<typeof orderSchema>

// Analytics Types
export type BestSeller = z.infer<typeof bestSellerSchema>
export type BestClient = z.infer<typeof bestClientSchema>
export type RecentActivityResume = z.infer<typeof getRecentActivitySchema>
export type GeneralActivityResume = z.infer<typeof getGeneralActivitySchema>