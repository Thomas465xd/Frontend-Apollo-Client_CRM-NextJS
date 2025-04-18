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
    email: z.string().email(),
})

// Auth Types
export type RegisterUserForm = z.infer<typeof registerSchema>
export type LoginUserForm = z.infer<typeof loginSchema>
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

// Client Types
export type ClientForm = z.infer<typeof clientSchema>