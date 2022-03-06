import {useState, useEffect} from 'react'
import {getAuth} from "firebase/auth"

export const Profile = () => {

    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(()=>{
        // console.log(auth);

        setUser(auth.currentUser)

    }, [])
    
  return user ? <h1>{user.displayName}</h1> : <h1>user is not logged In</h1>
}
