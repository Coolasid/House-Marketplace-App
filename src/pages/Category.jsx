import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { ListingItem } from '../components/ListingItem';


export const Category = () => {
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference

        const listingsRef = collection(db, 'listings');

        //create a query

        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        //execute query

        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          // console.log(doc.data());
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListing(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Colud not fetch listing');
      }
    };

    fetchListing();
  }, []);

  return (
    <div className="category">
      <header>
        <div className="pageHeader">
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </div>
      </header>

      {loading ? (
        <Spinner></Spinner>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
              <ul className="categoryListings">
                  {listings.map((listing)=>{
                   return <ListingItem listing={listing.data} id={listing.id} key={listing.id} ></ListingItem>
                  })}
                </ul>

          </main>
        
        </>
      ) : (
        <p> No listing for {params.categoryName} </p>
      )}
    </div>
  );
};
