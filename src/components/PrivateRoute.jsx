import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../Hooks/useAuthStatus";
import { Spinner } from "./Spinner";


export const PrivateRoute = () => {

    const {loggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus){
        return <Spinner></Spinner>
    }

  return loggedIn ? <Outlet></Outlet> : <Navigate to="/sign-in"></Navigate>
}
