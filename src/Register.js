import React, { useState } from "react";
import imgProfile from './images/img.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
 

function Register() {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          (error) => {
            setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL : downloadURL,
              });
              
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid, 
                displayName,
                email,
                photoURL : downloadURL,
              });

              await setDoc(doc(db, "userChats", res.user.uid), {})
              navigate("/")
            });
          }
        );
      } catch(err){
        setErr(true);
      }
  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo"> CHAT APP </span>
            <span className='title'> REGISTER</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor="file">
                <img src={imgProfile} alt="" />
                <span> Add profile pic </span>
                </label>
                <button>Sign Up</button>

                {err && <span> Error occured </span>}

            </form>
            <p>Have an account? <Link to="/login" className="link">LOGIN</Link></p>
        </div>
    </div>
  )
}

export default Register
