import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { CategorySchema } from '@workspace/utils/types';

export const AddCategory = async (req: Request, res: Response) => {
    try {
        const result = CategorySchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const FindCategory = await prisma.category.findFirst({
                where: {
                    name: req.body.name
                }
            })
            if (FindCategory) {
                res.status(409).json({ "message": "This Category Already Exists!" })
                return;
            }
            const category = await prisma.category.create({
                data: {
                    name: req.body.name,
                },
            })
            res.status(200).json({ "message": `New Category Added with name ${category.name} and ProductID ${category.id}!` })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const GetAllCategory = async (req: Request, res: Response) => {
    try {
        const findAllCategory = await prisma.category.findMany({})
        if (!findAllCategory) {
            res.status(404).json({ "message": "Category Doesn't Exists!" })
            return;
        }
        res.status(200).json({ "message": findAllCategory })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
//haven't build this yet route only
export const DeleteAllProductsByCategory = async (req: Request, res: Response) => {
    try {
        const deleteProductByCategory = await prisma.products.deleteMany({
            where: {
                AND: [
                    { userId: Number(req.id) },
                    {
                        categories: {
                            some: {
                                name: {
                                    in: req.body.category
                                }
                            }
                        }
                    }
                ]
            }
        })
        if (!deleteProductByCategory.count) {
            res.status(404).json({ "message": "This Product Doesn't Exists!" })
            return;
        }
        res.status(200).json({ "message": `Product with with ID ${req.params.id} is now deleted!` })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const GetProductByCategory = async (req: Request, res: Response) => {
    try {
        const findProductByCategory = await prisma.products.findFirst({
            where: {
                AND: [
                    { id: req.params.id },
                    { userId: Number(req.id) }
                ]
            },
            include: {
                categories: true,
            },
        })
        if (!findProductByCategory) {
            res.status(404).json({ "message": "This Product Doesn't Exists!" })
            return;
        }
        res.status(200).json({ "message": findProductByCategory })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}