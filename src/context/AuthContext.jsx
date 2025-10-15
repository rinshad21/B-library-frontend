import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "./../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
//auth provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //google provider
  const googleprovider = new GoogleAuthProvider();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the user object (or null)
      setLoading(false); // Stop loading once Firebase status is known
    }); // Cleanup function: this stops listening when the component unmounts

    return unsubscribe;
  }, []);

  //register a user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //signup with google

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleprovider);
  };
  //logout user
  const logout = async () => {
    return await signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
