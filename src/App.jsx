import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { ForgotPassword } from './pages/ForgotPassword';
import { Explore } from './pages/Explore';
import { Offers } from './pages/Offers';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Category } from './pages/Category';
import { CreateListing } from './pages/CreateListing';
import { Listing } from './pages/Listing';
import { ContactOwner } from './pages/ContactOwner';
import { EditListings } from './pages/EditListings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore></Explore>}></Route>
          <Route path="/offers" element={<Offers></Offers>}></Route>
          <Route path="/profile" element={<PrivateRoute></PrivateRoute>}>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Route>
          <Route path="/sign-In" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-Up" element={<SignUp></SignUp>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path='/category/:categoryName' element={<Category></Category>}></Route>
          <Route path='/create-listing' element={<CreateListing></CreateListing>}></Route>
          <Route path='/category/:categoryName/:listingId' element={<Listing></Listing>}></Route>
          <Route path='/contact/:ownerId' element={<ContactOwner></ContactOwner>}></Route>
          <Route path='/edit-listing/:listingId' element={<EditListings></EditListings>}></Route>
        </Routes>
        <Navbar> </Navbar>
      </Router>

      <ToastContainer autoClose={3000}></ToastContainer>
    </>
  );
}

export default App;
