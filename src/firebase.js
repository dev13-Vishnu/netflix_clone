
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth,
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { addDoc,
         collection,
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDH4scdbOSk6cMw6p4Q8LhmB-NIkn5gH7M",
  authDomain: "netflix-clone-26b3f.firebaseapp.com",
  projectId: "netflix-clone-26b3f",
  storageBucket: "netflix-clone-26b3f.firebasestorage.app",
  messagingSenderId: "721564330864",
  appId: "1:721564330864:web:5e60d03ad540b872c93db5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

const signup = async (name, email, password)=> {
    try {
        const res= await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email , password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}