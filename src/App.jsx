import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ForgotPassword } from './ForgotPassword';
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
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/sign-In" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-Up" element={<SignUp></SignUp>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
        </Routes>
        <Navbar> </Navbar>
      </Router>
    </>
  );
}

export default App;
