import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

const layout = () => {
    return (
        <div className='flex flex-col items-center mt-10 justify-center bg-white'>
            <h1 className=' text-4xl'>Clyra</h1>
            <Tabs defaultValue="login" className="mt-5">
                <TabsList className="">
                    <TabsTrigger value="login" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground focus:font-semibold">LOGIN</TabsTrigger>
                    <TabsTrigger value="signup" className="text-2xl cursor-pointer rounded-none px-18 py-5 font-normal focus:border-foreground focus:font-semibold">SIGNUP</TabsTrigger>
                </TabsList>
                <div className="pt-10">
                    <TabsContent value="login">Make changes to your account here.</TabsContent>
                    <TabsContent value="signup">Change your password here.</TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

export default layout