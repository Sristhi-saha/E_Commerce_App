import { Routes, Route } from 'react-router-dom'
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
import React from 'react'
import ChcekAuth from './components/common/check-auth.jsx'
import UnAuthPages from './pages/unauth-pages/index.jsx'


const App = () => {
  const isAuthenticated = false;
  const user = {
    name:"John Doe",
    role: 'user' // Change to 'user' to test user role
  };
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* Your app components will go here */}
      {/* common component */}
      <h1 className='text-2xl font-bold text-center mt-10'>E-Commerce Application</h1>
      {/* Add Routes and other components as needed */}
      <Routes>
        <Route path="/auth" element={
          <ChcekAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </ChcekAuth>
        }>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>
        <Route path='/admin' element={
          <ChcekAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </ChcekAuth>
        }>
          {/* Admin specific routes can be added here */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path='/shopping' element={
          <ChcekAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingViewLayout />
          </ChcekAuth>
        }>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path='/shop' element={
          <ChcekAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingViewLayout />
          </ChcekAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listing />} />
          <Route path='account' element={<Account />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        <Route path='/unauth-page' element={<UnAuthPages />} />
      </Routes>
    </div>
  )
}



export default App