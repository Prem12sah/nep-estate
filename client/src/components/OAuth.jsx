
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';  
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handGoogleClick = async () => {
        try {
           const provider = new GoogleAuthProvider(); 
           const auth = getAuth(app);
           const result = await signInWithPopup(auth, provider);
         const res= await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: result.user.email,
                name: result.user.displayName,
                photo: result.user.photoURL,
            })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('Google sign-in error:', error);
            
        }
    }
  return (
   <button onClick={handGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign in with Google
   </button>
  )
}
