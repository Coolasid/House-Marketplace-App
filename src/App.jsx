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
        </Routes>
        <Navbar> </Navbar>
      </Router>

      <ToastContainer autoClose={3000}></ToastContainer>
    </>
  );
}

export default App;
