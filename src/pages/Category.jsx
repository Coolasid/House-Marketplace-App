import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';

export const Category = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(()=>{

    const fetchListing = async () =>{
        try {

            //get a reference

            const listingsRef = collection(db, "listings")

            //create a query

            

        } catch (error) {
            
        }
    }

    fetchListing()

  },[])

  return <div>Category</div>;
};
