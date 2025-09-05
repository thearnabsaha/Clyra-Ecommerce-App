"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
const formSchema = z.object({
    username: z.string().min(2).max(50),
})
import { Button } from "@workspace/ui/components/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
const page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div>
            <div className='flex flex-col items-center mt-10 justify-center bg-white'>
                <h1 className=' text-4xl'>Clyra</h1>
                <Tabs defaultValue="login" className="mt-5">
                    <TabsList className="">
                        <TabsTrigger value="login" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground focus:font-semibold">LOGIN</TabsTrigger>
                        <TabsTrigger value="signup" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground focus:font-semibold">SIGNUP</TabsTrigger>
                    </TabsList>
                    <div className="pt-10">
                        <TabsContent value="login">
                            <div className="border">
                                <h1>Log in using Email</h1>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is your public display name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                                <h1>Enter Your Password</h1>
                            </div>
                        </TabsContent>
                        <TabsContent value="signup">
                            <h1>SignUp</h1>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default page