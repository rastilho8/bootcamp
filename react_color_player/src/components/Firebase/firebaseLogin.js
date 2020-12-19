import { auth } from "./firebase_conf";

const login = async (email, password, setError, setShowLogin, history) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    setShowLogin(false);
    setError(null);

    history.push("/gameLobby");
  } catch (err) {
    setError(err.message);
  }
};

export default login;
