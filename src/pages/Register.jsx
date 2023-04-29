import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
/*
john.doe@gmail.com
John123
*/
const Register = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate('/')

                    });

                }
            );
        } catch (err) {
            setError(true)
        }
    }


    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Chat App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Display Name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input style={{ display: 'none' }} type="file" id="file" />
                    <label htmlFor="file">
                        <BiImageAdd size={35} color='blueviolet'></BiImageAdd>
                        <span>Add avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {error && <span>Something went wrong</span>}
                </form>
                <p>Do you have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register