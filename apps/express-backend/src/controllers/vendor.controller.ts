import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { VendorSignInSchema, VendorSignUpSchema } from '@workspace/utils/types';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config';
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
            if (findUser) {
                res.status(409).json({ "message": `User with email ${findUser.email} Already Exists!` })
                return;
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 8)
            const user = await prisma.vendor.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                },
            })
            res.status(200).json({ "message": `New Vendor Added with name ${user.name} and Email ${user.email}!` })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const VendorSignin = async (req: Request, res: Response) => {
    try {
        const result = VendorSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            const findUser = await prisma.vendor.findFirst({
                where: {
                    email: req.body.email,
                }
            })
            if (!findUser) {
                res.status(404).json({ "message": "User Doesn't Exists!" })
                return;
            }
            const isAuthenticate = await bcrypt.compare(req.body.password, findUser.password)
            if (!isAuthenticate) {
                res.status(401).json({ "message": "Wrong Password!" })
                return;
            }
            var token = jwt.sign({ id: findUser.id }, JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ "token": token })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
