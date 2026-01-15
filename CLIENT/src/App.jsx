import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthAction } from './store/auth-slice/index.js'
import AuthLayout from './components/auth/layout.jsx'
import Authlogin from './pages/auth/login.jsx'
import Authregister from './pages/auth/register.jsx'
import AdminLayout from './components/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import AdminProducts from './pages/admin-view/products.jsx'
import ShoppingViewLayout from './components/shopping-view/layout.jsx'
import NotFound from './pages/not-found/index.jsx'
import Home from './pages/shopping-view/Home.jsx'
import Listing from './pages/shopping-view/Listing.jsx'
import Account from './pages/shopping-view/account.jsx'
import Checkout from './pages/shopping-view/checkout.jsx'
import CheckAuth from './components/common/check-auth.jsx'
import UnAuthPages from './pages/unauth-pages/index.jsx'
import { Skeleton } from "@/components/ui/skeleton"

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthAction())
  }, [dispatch])

  if (isLoading) {
    return <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[600px]" />
      </div>
    </div>
  }
  
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <div>
              <h1 className='text-2xl font-bold text-center mt-4'>E-Commerce Application</h1>
              <AuthLayout />
            </div>
          </CheckAuth>
        }>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>
        
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <div>
              <h1 className='text-2xl font-bold text-center mt-4'>E-Commerce Application</h1>
              <ShoppingViewLayout />
            </div>
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listing />} />
          <Route path='account' element={<Account />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        
        <Route path='/unauth-page' element={<UnAuthPages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App