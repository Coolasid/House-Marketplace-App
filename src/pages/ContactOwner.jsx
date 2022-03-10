import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';

export const ContactOwner = () => {
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const parms = useParams();

  useEffect(() => {
    let getOwner = async () => {
      const docRef = doc(db, 'users', parms.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error('Could not Get Owner Data');
      }
    };
    getOwner();
  }, [parms.ownerId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
      </header>

      {owner !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {owner.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button className="primaryButton" type="button">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};
