import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { VendorSignInSchema, VendorSignUpSchema } from '@workspace/utils/types';
import bcrypt from 'bcrypt'
export const VendorSignup = async (req: Request, res: Response) => {
    try {
        const result = VendorSignUpSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const findUser = await prisma.vendor.findFirst({
                where: {
                    email: req.body.email,
                }
            })
            if(findUser){
                res.status(409).json("User Already Exists!")
                return;
            }
            const hashedPassword=await bcrypt.hash(req.body.password,8)
            await prisma.vendor.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                },
            })
            res.status(200).json("New User Added!")
        }
    } catch (error) {
        res.status(500).json({"Error":"Internal Server Error!"})
    }
}
// export const VendorSignin = async (req: Request, res: Response) => {
//     try {
//         const result = VendorSignInSchema.safeParse(req.body);
//         if (!result.success) {
//             res.status(400).json(result.error.format());
//         } else {
//             const findUser = await prisma.vendor.findFirst({
//                 where: {
//                     email: req.body.email,
//                 }
//             })
//             if(findUser){
//                 res.status(409).json("User Already Exists!")
//                 return;
//             }
//             const newUser = await prisma.vendor.create({
//                 data: {
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password
//                 },
//             })
//             res.status(200).json(newUser)
//         }
//     } catch (error) {
//         res.status(500).json({"Error":"Internal Server Error!"})
//     }
// }