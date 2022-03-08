import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { Spinner } from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

export const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){

        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false)

      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if(loading){
      return <Spinner></Spinner>
  }

  return <div>Listing</div>;
};
