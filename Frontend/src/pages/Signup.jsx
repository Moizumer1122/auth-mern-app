
import { useState } from 'react'
import { Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
const [signupData,setSignupData]=useState({
  name:"",
  email:"",
  password:""
})

  const navigate = useNavigate();
// to add the data in sttae in object when we type in input field
const handleChange=(e)=>{
 console.log(e.target.name,e.target.value);
  setSignupData({...signupData,[e.target.name]:e.target.value})

  const CopySignupData={...signupData}
  CopySignupData[e.target.name]=e.target.value
  console.log(CopySignupData);
}


 const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupData;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:3000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    




  return (
 <div className="signup-container">

<h1>Signup</h1>

<form className="signup-form" onSubmit={handleSignup}>

<label htmlFor="username">Username:</label>

<input type="text" id="username" name="name" placeholder='enter your name....' required autoFocus 
onChange={handleChange} value={signupData.name} />

<label htmlFor="email">Email:</label>

<input type="email" id="email" name="email" placeholder='enter your email....' required onChange={handleChange}value={signupData.email} />

<label htmlFor="password">Password:</label>

<input type="password" id="password" name="password" placeholder='enter your password....' required onChange={handleChange} value={signupData.password} />

<button type="submit">Sign Up</button>

</form>
<ToastContainer />
<span className="signup-link">
  Already have an account? <Link to='/login'>Login here</Link>
</span>
 </div>
  )
}

export default Signup;

