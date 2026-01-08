import { Outlet } from "react-router-dom";

function AuthLayout(){
    return(
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-2">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-4xl font-bold">Welcome to Our ECommerce Platform</h1>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;