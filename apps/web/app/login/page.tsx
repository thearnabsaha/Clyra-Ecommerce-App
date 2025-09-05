"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FieldValues } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { CustomerSignInSchema, CustomerSignUpSchema } from '@workspace/utils/types';
import { Button } from "@workspace/ui/components/button"
import axios from 'axios';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { BACKEND_URL } from "@/lib/config"
const page = () => {
    const SignUpform = useForm<FieldValues>({
        resolver: zodResolver(CustomerSignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
        },
    })
    const SignInform = useForm<FieldValues>({
        resolver: zodResolver(CustomerSignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    function SignuponSubmit(values: z.infer<typeof CustomerSignInSchema>) {
        // console.log(values)
        axios.post(`${BACKEND_URL}/customer/signup`, values)
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        SignUpform.reset()
    }
    function SigninonSubmit(values: z.infer<typeof CustomerSignInSchema>) {
        // console.log(values)
        axios.post(`${BACKEND_URL}/customer/signin`, values)
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        SignInform.reset()
    }
    return (
        <div>
            <div className='flex flex-col items-center mt-10 justify-center bg-white'>
                <h1 className=' text-4xl'>Clyra</h1>
                <Tabs defaultValue="login" className="mt-5">
                    <TabsList className=" bg-transparent shadow-none">
                        <TabsTrigger value="login" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground border-b- focus:font-semibold">LOGIN</TabsTrigger>
                        <TabsTrigger value="signup" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground border-b- focus:font-semibold">SIGNUP</TabsTrigger>
                    </TabsList>
                    <div className="pt-10">
                        <TabsContent value="login">
                            <Form {...SignInform}>
                                <form onSubmit={SignInform.handleSubmit(SigninonSubmit)} className="w-full space-y-6">
                                    <FormField
                                        control={SignInform.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Log in using Email</FormLabel>
                                                <FormControl>
                                                    <Input className="h-12 placeholder:text-lg" placeholder="Enter Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={SignInform.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter Your Password</FormLabel>
                                                <FormControl>
                                                    <Input className="h-12 placeholder:text-lg" placeholder="Enter Password" {...field} type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button type="submit" className="w-full h-12">LOGIN</Button>
                                        <Button variant="outline" className="w-full mt-2 h-12"> Login With Google</Button>
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <Form {...SignUpform}>
                                <form onSubmit={SignUpform.handleSubmit(SignuponSubmit)} className="w-full space-y-6">
                                    <div className="flex justify-between">
                                        <FormField
                                            control={SignUpform.control}
                                            name="firstname"
                                            render={({ field }) => (
                                                <FormItem className="w-full mr-3">
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="h-12 placeholder:text-lg" placeholder="First Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={SignUpform.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="h-12 placeholder:text-lg" placeholder="Last Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={SignUpform.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Log in using Email</FormLabel>
                                                <FormControl>
                                                    <Input className="h-12 placeholder:text-lg" placeholder="Enter Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={SignUpform.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter Your Password</FormLabel>
                                                <FormControl>
                                                    <Input className="h-12 placeholder:text-lg" placeholder="Enter Password" {...field} type="password" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button type="submit" className="w-full h-12">SIGNUP</Button>
                                        <Button variant="outline" className="w-full mt-2 h-12"> Login With Google</Button>
                                    </div>
                                </form>
                            </Form>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default page