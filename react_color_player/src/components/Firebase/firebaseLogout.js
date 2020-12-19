import { auth } from "./firebase_conf";

const logout = async (history) => {
   
  try {
    await auth.signOut();
    

    history.push("/");
  } catch (err) {
    
  }
};

export default logout;
