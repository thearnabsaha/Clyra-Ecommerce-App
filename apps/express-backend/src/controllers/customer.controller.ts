import { Request, Response } from 'express';
import { prisma } from '@workspace/database/client';
import { CustomerSignInSchema, CustomerSignUpSchema } from '@workspace/utils/types';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_CUSTOMER } from '../config';
export const CustomerSignup = async (req: Request, res: Response) => {
    try {
        const result = CustomerSignUpSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            //@ts-ignore
            const findUser = await prisma.customer.findFirst({
                where: {
                    email: req.body.email,
                }
            })
            if (findUser) {
                res.status(409).json({ "message": `User with email ${findUser.email} Already Exists!` })
                return;
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 8)
            //@ts-ignore
            const user = await prisma.customer.create({
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword
                },
            })
            res.status(200).json({ "message": `New Vendor Added with name ${user.firstname} and Email ${user.email}!` })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const CustomerSignin = async (req: Request, res: Response) => {
    try {
        const result = CustomerSignInSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
        } else {
            //@ts-ignore
            const findUser = await prisma.customer.findFirst({
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
            var token = jwt.sign({ id: findUser.id }, JWT_SECRET_CUSTOMER, { expiresIn: "1h" });
            res.status(200).json({ "token": token })
        }
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
export const CustomerProfile = async (req: Request, res: Response) => {
    try {
            //@ts-ignore
        const findUser = await prisma.customer.findFirst({
            where: {
                id:Number(req.id)
            }
        })
        if (!findUser) {
            res.status(404).json({ "message": "User Doesn't Exists!" })
            return;
        }
        res.status(200).json({ "Customer": findUser })
    } catch (error) {
        res.status(500).json({ "Error": error })
        console.log(error)
    }
}
