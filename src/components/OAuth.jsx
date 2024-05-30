import {useLocation , useNavigate} from 'react-router-dom'
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'


function OAuth() {
    const navigate=useNavigate()
    const location=useLocation()
    const onGoogleClick=async()=>{
    try{
        const auth=getAuth()
        const provider=new GoogleAuthProvider()
        const userCredential=await signInWithPopup(auth,provider)
        const user=userCredential.user
        const userRef=doc(db,'users',user.uid)
        const userSnap=await getDoc(userRef)
        if(!userSnap.exists()){
            await setDoc(userRef,{
                name:user.displayName,
                email:user.email,
                timestamp:serverTimestamp()
            })
        }
        navigate('/')
    }
    catch(err){
        toast.error('Something went wrong with the google sign in!')
    }
    
    
    }


  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname==='/sign-up'? 'up': 'in'} with</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth
