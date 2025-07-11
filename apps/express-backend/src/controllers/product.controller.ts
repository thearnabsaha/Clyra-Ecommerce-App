import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { ProductSchema, VendorSignInSchema, VendorSignUpSchema } from '@workspace/utils/types';

export const AddProduct = async (req: Request, res: Response) => {
    try {
        const result = ProductSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const user = await prisma.products.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    userId: Number(req.id),
                },
            })
            res.status(200).json(user)
            // res.status(200).json({"message":"User Vendor Added!"})
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const GetAllProducts = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            res.status(200).json({ "message": "User Vendor Added!" })

        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const GetProduct = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            res.status(200).json({ "message": "User Vendor Added!" })

        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            res.status(200).json({ "message": "User Vendor Added!" })

        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const DeleteProduct = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            res.status(200).json({ "message": "User Vendor Added!" })

        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const DeleteAllProduct = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            res.status(200).json({ "message": "User Vendor Added!" })

        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}