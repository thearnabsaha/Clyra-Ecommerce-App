import { z } from 'zod';
export const VendorSignUpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const VendorSignInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const ProductSchema = z.object({
    title: z.string().min(3, { message: 'title must be at least 3 characters long' }),
    description: z.string().min(5, { message: 'description must be at least 5 characters long' }),
    image: z.string(),
    brand:z.string(),
    StockAmount:z.number(),
    price: z.number().min(1, { message: 'title must be at least 5 characters long' }),
});
export const CategorySchema = z.object({
    name: z.string().min(3, { message: 'catagory name must be at least 3 characters long' }),
});
export const CustomerSignUpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    firstname: z.string().min(3, { message: 'Firstname must be at least 3 characters long' }),
    lastname: z.string().min(1, { message: 'Lastname must be at least 1 characters long' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const CustomerSignInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});