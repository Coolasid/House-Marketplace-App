import { useState } from 'react';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { OAuth } from '../components/OAuth';

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
      setFormData((prevState)=>({
          ...prevState,
          [e.target.id]: e.target.value
      }))
  };

  const onSubmit = async(e)=>{
    e.preventDefault()

    try {
        
        const auth = getAuth();

        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        // /checking user cred//
        if(userCredential.user){
            navigate('/')
        }

    } catch (error) {
        toast.error('Wrong User Credential')
    }
  }

  return (
    <div>
      <div className="pageContainer">
        <header>
          <div className="pageHeader">Welcome Back!</div>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={onChange}
              id="email"
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link className="forgotPasswordLink" to="/forgot-password">
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>

              <button className="signInButton"><ArrowRightIcon fill='white' width="34px" height="36px"></ArrowRightIcon></button>
            </div>
          </form>

        </main>
      </div>
          <OAuth></OAuth>
          <Link to="/sign-Up" className='registerLink'>
              Sign Up Insted</Link>
    </div>
  );
};
