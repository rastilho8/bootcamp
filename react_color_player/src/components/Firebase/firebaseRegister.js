import { projectFirestore, auth } from "./firebase_conf";

const Register = async (email, name, password, setError, setSignUp) => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    setSignUp(false);
    setError(null);

    projectFirestore.collection("users").doc(response.user.uid).set({ name });

    const lobbys = await projectFirestore.collection("lobby").get();
    let documents = [];
    lobbys.docs.map((doc) => {
      documents.push(doc.id);
      return documents;
    });

  
    let count = 0;
    let key = response.user.uid;
    var lobbyUpdate = {};
    

    for (let i = 0; i < documents.length; i++) {
      
      let doc = await projectFirestore
        .collection("lobby")
        .doc(documents[i])
        .get();

      count = Object.keys(doc.data()).length;

      if (count <= 4) {
        lobbyUpdate[key] = {id: key, name, color: "grey"};
        await projectFirestore
          .collection("lobby")
          .doc(documents[i])
          .update(lobbyUpdate);

        return;
      }
    }

    if (count > 4) {
      lobbyUpdate[key] = {id: key, name, color: "grey"};
      projectFirestore.collection("lobby").doc().set(lobbyUpdate);
    } else {
      lobbyUpdate[key] = {id: key, name, color: "grey"};
      projectFirestore.collection("lobby").doc().set(lobbyUpdate);
    }
  } catch (err) {
    setError(err.message);
  }
};

export default Register;
