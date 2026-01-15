import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { useState } from "react";

function AdminLayout(){
    const [openSidebar,setOpenSitebar] = useState(false)
    return(
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <Sidebar open={openSidebar} setOpen={setOpenSitebar}/>
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <Header open={openSidebar} setOpen={setOpenSitebar}/>
                <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div> 
        </div>
    )
}

export default AdminLayout;