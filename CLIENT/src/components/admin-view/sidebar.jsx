
import React from 'react'
import { ChartBar ,ChartNoAxesCombined,LayoutDashboard,ShoppingBasket,CircleCheckBig} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Sheet,SheetContent, SheetHeader,SheetTitle} from '../ui/sheet'

const adminSidebarMenuItems = [
    {
        id : 'dashboard',
        label :'Dashboard',
        path : '/admin/dashboard',
        icons : <LayoutDashboard />
    },
    {
        id : 'products',
        label :'Products',
        path : '/admin/products',
        icons : <ShoppingBasket />
    },
    {
        id : 'orders',
        label :'Orders',
        path : '/admin/orders',
        icons : <CircleCheckBig />
    }
]





function MenuItems({setOpen}){
  const navigate = useNavigate()
  return <nav className='mt-8 flex-col flex gap-2'>
  {
    adminSidebarMenuItems.map(menuItem => <div 
      key={menuItem.id}
      onClick={() => {
        navigate(menuItem.path);
        if (setOpen) setOpen(false);
      }} 
      className='flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
      {menuItem.icons}
      <span>{menuItem.label}</span>
    </div>)
  }
</nav>
}

const Sidebar = ({open,setOpen,}) => {
  const navigate = useNavigate();
  return (
   <>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className="flex flex-col h-full">
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 font-bold text-xl'> <ChartNoAxesCombined />Admin Panel</SheetTitle>
            </SheetHeader>

            <MenuItems onClick={() => setOpen(false)} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    <aside className='hidden w-64 flex-col border-b bg-background p-6 lg:flex'>
      <div onClick={()=>navigate('/admin/dashboard')} className="flex item-center gap-2 cursor-pointer">
       <ChartNoAxesCombined />
        <h1 className='font-bold text-xl'>Admin Panel</h1>
      </div>
      <MenuItems />
    </aside>
   </>
  )
}

export default Sidebar