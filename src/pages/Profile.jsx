import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"
import {} from 'firebase/firestore'

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  ///here we are updating our user in FB and FS
  const onSubmit = async () => {
    
    try {

        if(auth.currentUser.displayName !== name){

            //updating FS
            await updateProfile(auth.currentUser, {
                displayName:name
            })

            //updating in FB
            const userRef = doc(db, "users", auth.currentUser.uid)

            await updateDoc(userRef, {
                name
            })


        }   
        
    } catch (error) {
        toast.error("Could not update profile details")
    }

  };

  const onChange = (e)=>{
      setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value
      }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <div className="pageHeader">My Profile</div>
        <button className="logOut" type="button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              id="name"
              disabled={!changeDetails}
              value = {name}
              onChange={onChange}
            />
            <input
              type="text"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              id="email"
              disabled={!changeDetails}
              value = {email}
              onChange={onChange}
            />
          </form>
        </div>
          
          <Link to="/create-listing" className='createListing'>
            <img src={homeIcon} alt="home" />
            <p>Sell or Rent your home</p>
            <img src={arrowRight} alt="arrow_right" />
            </Link>

      </main>
    </div>
  );
};
