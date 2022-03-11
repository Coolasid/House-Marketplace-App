import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import { ListingItem } from '../components/ListingItem';

export const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  ///here we are updating our user in FB and FS
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //updating FS
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //updating in FB
        const userRef = doc(db, 'users', auth.currentUser.uid);

        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  ///to delete the listing
  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const docRef = doc(db, 'listings', listingId);

      await deleteDoc(docRef);

      const updateListings = listing.filter((listing) => {
        return listing.id !== listingId;
      });

      setListing(updateListings);
      toast.success("Successfully deleted listing")
    }
  };

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
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              id="email"
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or Rent your home</p>
          <img src={arrowRight} alt="arrow_right" />
        </Link>

        {!loading && listing?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingList">
              {listing.map((listing) => {
                return (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                    onDelete={() => onDelete(listing.id)}
                  >
                    {' '}
                  </ListingItem>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};
