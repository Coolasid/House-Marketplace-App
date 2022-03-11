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

export const Offers = () => {
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //get a reference

        const listingsRef = collection(db, 'listings');

        //create a query

        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(5)
        );

        //execute query

        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

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

  //pagination / load more
  const onFetchMoreListings = async () => {
    try {
      //get a reference

      const listingsRef = collection(db, 'listings');

      //create a query

      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(5)
      );

      //execute query

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        // console.log(doc.data());
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Colud not fetch listing');
    }
  };

  return (
    <div className="category">
      <header>
        <div className="pageHeader">Offers</div>
      </header>

      {loading ? (
        <Spinner></Spinner>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  ></ListingItem>
                );
              })}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers </p>
      )}
    </div>
  );
};
