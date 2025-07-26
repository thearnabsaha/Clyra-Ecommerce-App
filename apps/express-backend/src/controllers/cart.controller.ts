import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { ProductSchema } from '@workspace/utils/types';

export const AddProductToCart = async (req: Request, res: Response) => {
    try {
        const result = ProductSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const product = await prisma.products.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    image: req.body.image,
                    brand: req.body.brand,
                    StockAmount: req.body.StockAmount,
                    categories: {
                        connect: req.body.categories
                    },
                    userId: Number(req.id),
                },
            })
            res.status(200).json({ "message": `New Product Added with title ${product.title} and ProductID ${product.id}!` })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
// export const GetAllProducts = async (req: Request, res: Response) => {
//     try {
//         const findAllProduct = await prisma.products.findMany({
//             where: {
//                 userId: Number(req.id)
//             },
//             include: {
//                 categories: true,
//             },
//         })
//         if (!findAllProduct) {
//             res.status(404).json({ "message": "Products Doesn't Exists!" })
//             return;
//         }
//         res.status(200).json({ "message": findAllProduct })
//     } catch (error) {
//         res.status(500).json({ "Error": error })
//         console.log(error)
//     }
// }
// export const GetProduct = async (req: Request, res: Response) => {
//     try {
//         const findProductByID = await prisma.products.findFirst({
//             where: {
//                 AND: [
//                     { id: req.params.id },
//                     { userId: Number(req.id) }
//                 ]
//             },
//             include: {
//                 categories: true,
//             },
//         })
//         if (!findProductByID) {
//             res.status(404).json({ "message": "This Product Doesn't Exists!" })
//             return;
//         }
//         res.status(200).json({ "message": findProductByID })
//     } catch (error) {
//         res.status(500).json({ "Error": error })
//         console.log(error)
//     }
// }
// export const UpdateProduct = async (req: Request, res: Response) => {
//     try {
//         const result = ProductSchema.safeParse(req.body);
//         if (!result.success) {
//             res.status(400).json(result.error.format());
//         } else {
//             const findProductByID = await prisma.products.findFirst({
//                 where: {
//                     AND: [
//                         { id: req.params.id },
//                         { userId: Number(req.id) }
//                     ]
//                 }
//             })
//             if (!findProductByID) {
//                 res.status(404).json({ "message": "This Product Doesn't Exists!" })
//                 return;
//             }
//             const product = await prisma.products.update({
//                 where: {
//                     id: findProductByID.id
//                 },
//                 data: {
//                     title: req.body.title,
//                     description: req.body.description,
//                     price: req.body.price,
//                     image: req.body.image,
//                     brand: req.body.brand,
//                     StockAmount: req.body.StockAmount,
//                     categories: {
//                         set: req.body.categories
//                     },
//                 },
//             })
//             res.status(200).json({ "message": `Product with id ${product.id} is updated now!` })
//         }
//     } catch (error) {
//         res.status(500).json({ "Error": error })
//         console.log(error)
//     }
// }
// export const DeleteProduct = async (req: Request, res: Response) => {
//     try {
//         const deleteProductByID = await prisma.products.deleteMany({
//             where: {
//                 AND: [
//                     { id: req.params.id },
//                     { userId: Number(req.id) }
//                 ]
//             }
//         })
//         if (!deleteProductByID.count) {
//             res.status(404).json({ "message": "This Product Doesn't Exists!" })
//             return;
//         }
//         res.status(200).json({ "message": `Product with with ID ${req.params.id} is now deleted!` })
//     } catch (error) {
//         res.status(500).json({ "Error": error })
//         console.log(error)
//     }
// }
// export const DeleteAllProduct = async (req: Request, res: Response) => {
//     try {
//         const deleteAllProduct = await prisma.products.deleteMany({
//             where: {
//                 userId: Number(req.id)
//             }
//         })
//         if (!deleteAllProduct.count) {
//             res.status(404).json({ "message": "Products Doesn't Exists!" })
//             return;
//         }
//         res.status(200).json({ "message": "All Products are now deleted!" })
//     } catch (error) {
//         res.status(500).json({ "Error": error })
//         console.log(error)
//     }
// }