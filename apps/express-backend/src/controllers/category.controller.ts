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
//it will delete all products in this category and delinks products if they had more than one Products
export const DeleteAllProductsByCategorySoft = async (req: Request, res: Response) => {
    try {
        const findProductByCategory = await prisma.products.findMany({
            where: {
                AND: [
                    { id: req.params.id },
                    {
                        categories: {
                            some: {
                                name: String(req.query.name)
                            }
                        }
                    }
                ]
            },
            include: {
                categories: true
            }
        })
        if (!findProductByCategory) {
            res.status(404).json({ "message": "This Product Doesn't Exists!" })
            return;
        }
        const ProductsWithSingleCategory = findProductByCategory.filter((e) => {
            return e.categories.length == 1
        })
        const ProductsForDelete = ProductsWithSingleCategory.map((e) => {
            return e.id
        })
        const deleteProductByCategory = await prisma.products.deleteMany({
            where: {
                AND: [
                    {
                        id: {
                            in: ProductsForDelete
                        }
                    }
                ]
            },
        })
        const ProductsWithManyId = findProductByCategory.filter((e) => {
            return e.categories.length != 1
        })
        const ProductsAfterDelink=ProductsWithManyId.filter((e)=>{
            e.categories=e.categories.filter((e)=>e.name!==req.query.name)
            return e.categories
        })
        ProductsAfterDelink.forEach(async (e)=>{
            await prisma.products.update({
                where:{
                    id:e.id
                },
                data:{
                    categories:{
                        disconnect:{
                            name:String(req.query.name)
                        }
                    }
                }
            })
        })
        res.status(200).json({ "message":`Products of catagory name : ${req.query.name} are deleted!` })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
//it will delete all products in this category even if it has more than one category
//!will make this route
export const DeleteAllProductsByCategoryHard = async (req: Request, res: Response) => {
    try {
        const findProductByCategory = await prisma.products.findMany({
            where: {
                AND: [
                    { id: req.params.id },
                    {
                        categories: {
                            some: {
                                name: String(req.query.name)
                            }
                        }
                    }
                ]
            },
            include: {
                categories: true
            }
        })
        if (!findProductByCategory) {
            res.status(404).json({ "message": "This Product Doesn't Exists!" })
            return;
        }
        const ProductsWithSingleCategory = findProductByCategory.filter((e) => {
            return e.categories.length == 1
        })
        const ProductsForDelete = ProductsWithSingleCategory.map((e) => {
            return e.id
        })
        const deleteProductByCategory = await prisma.products.deleteMany({
            where: {
                AND: [
                    {
                        id: {
                            in: ProductsForDelete
                        }
                    }
                ]
            },
        })
        const ProductsWithManyId = findProductByCategory.filter((e) => {
            return e.categories.length != 1
        })
        const ProductsAfterDelink=ProductsWithManyId.filter((e)=>{
            e.categories=e.categories.filter((e)=>e.name!==req.query.name)
            return e.categories
        })
        ProductsAfterDelink.forEach(async (e)=>{
            await prisma.products.update({
                where:{
                    id:e.id
                },
                data:{
                    categories:{
                        disconnect:{
                            name:String(req.query.name)
                        }
                    }
                }
            })
        })
        res.status(200).json({ "message":`Products of catagory name : ${req.query.name} are deleted!` })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const GetProductByCategory = async (req: Request, res: Response) => {
    try {
        const findProductByCategory = await prisma.products.findMany({
            where: {
                AND: [
                    { id: req.params.id },
                    {
                        categories: {
                            some: {
                                name: String(req.query.name)
                            }
                        }
                    }
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