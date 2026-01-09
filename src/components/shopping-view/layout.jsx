import { Outlet } from 'react-router-dom';
import ShoppingViewHeader from './header.jsx';



function ShoppingViewLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
        {/* common headers */}
        <ShoppingViewHeader />
        <main className="flex flex-col w-full">
            <Outlet />
        </main>
    </div>
  );
}

export default ShoppingViewLayout;