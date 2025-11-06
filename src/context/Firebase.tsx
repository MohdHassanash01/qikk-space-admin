import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Create context
const FirebaseContext = createContext(null);

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase services
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Function names should be camelCase
  function signupUserWithEmailAndPassword(email:string, password:string) {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signinUserWithEmailAndPassword(email:string, password:string) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signinWithGoogle() {
    return signInWithPopup(firebaseAuth, googleProvider);
  }

  function logoutUser() {
  return signOut(firebaseAuth);
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // ✅ cleanup subscription
  }, []);

      const isloggedIn = user ? true : false

 



  async function handleCreateNewList(
    name: string,
    category: string,
    description: string,
    technologies: string[],
    client: string,
    year: string,
    createdAt: string,
    image: File
  ) {

    console.log({
      name,
      category,
      description,
      technologies,
      client,
      year,
      createdAt,
      image
    });
    

    try {
      
      console.log("🔥 Uploading image to Firebase Storage...", image);

  const imageRef = ref(storage, `uploads/images/portfolio/${Date.now()}-${image.name}`);
  console.log("📂 Storage ref created:", imageRef.fullPath);

  const uploadResult = await uploadBytes(imageRef, image);

  console.log("✅ Upload complete:", uploadResult);


      // ✅ Add Firestore document
      return await addDoc(collection(firestore, "portfolioAdmin"), {
        name,
        category,
        description,
        technologies,
        client,
        year,
        createdAt,
        imageURL: uploadResult.ref.fullPath,
        userID: user?.uid || null,
        userEmail: user?.email || null,
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        timestamp: new Date().toISOString(),
      })

  

    } catch (error) {
      console.error("🔥 Firestore upload failed:", error)
      throw error
    }
  }




  // ✅ Get all data
  async function getData() {
    return getDocs(collection(firestore, "portfolioAdmin"));
  }

  // ✅ Get image download URL
    const getImagesUrl = async (imagePath) => {
    if (!imagePath) return "";
    try {
      const url = await getDownloadURL(ref(storage, imagePath));
      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return "";
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewList,
        getData,
        getImagesUrl,
        user,
        isloggedIn,
        logoutUser
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// ✅ Custom hook for using Firebase context
export const useFirebase = () => useContext(FirebaseContext);
