import {Navigate,Outlet} from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner';
function PrivateRoute() {
   const {loggedIn,loading}=useAuthStatus()
     if(loading){
         return <Spinner/>
    }

    return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}
// outlet is used to render the child routes of the parent route
export default PrivateRoute
