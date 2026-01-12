import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

function CheckAuth({isAuthenticated,user,children}) {
    const location = useLocation();
    console.log(isAuthenticated,user,location.pathname)
    if(!isAuthenticated && !( location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
    return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && (location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
        if(user?.role === 'admin'){
            return <Navigate to="/admin/dashboard" />
        }else{
            return <Navigate to='/shop/home'/>
        }
    }


    if(isAuthenticated && user?.role!=='admin' && (location.pathname.includes('/admin'))){
        return <Navigate to='/unauth-page' />
    }

    if(isAuthenticated && user?.role==='admin' && (location.pathname.includes('/shop'))){
        return <Navigate to='/admin/dashboard' />
    }

    return <>{children}</>
}

export default CheckAuth;