import { useState } from "react"
import { toast } from "react-toastify"
import {Link,useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from "../components/OAuth"

function Sign() {
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const navigate=useNavigate()

    const onChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
        //setFormData((prevState)=>({ ...prevState,[e.target.id]:e.target.value}) )
    }
   
    const onSubmit=async(e)=>{
        try{
        e.preventDefault()
        const auth=getAuth()
        const userCrdential=await signInWithEmailAndPassword(auth,email,password)
        if(userCrdential.user){
            navigate('/')
        }
    }
    catch(err){
        toast.error("Invalid Credentials")
    }
    }

    return (
<>
<div className="pageContainer">
<header>
    <p className="pageHeader">
        Welcome Back!
    </p>
    <form onSubmit={onSubmit}>
        <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange}/>
        <div className="passwordInputDiv">
            <input type={showPassword?'text':'password'} className="passwordInput" id='password' value={password} onChange={onChange} />
        <img src={visibilityIcon} alt="" className="showPassword" onClick={()=>setShowPassword((prevState)=>!prevState)} />
        </div>

        <Link to='/forgot-password' className="forgotPasswordLink" > Forgot Password </Link>
    <div className="signInBar">
        <p className="signInText">
            Sign In
        </p>
        <button className="signInButton">
            <ArrowRightIcon fill='#fff' width='24px' height='24px' />
        </button>
    </div>
    
    </form>

<OAuth/>

        <Link to='/sign-up'className="registerLink">
            Sign Up Instead
        </Link>

</header>

</div>


</>
    )
  }
  
  export default Sign
  
  