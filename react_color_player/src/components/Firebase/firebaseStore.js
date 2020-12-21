import { useState, useEffect } from "react";
import { projectFirestore } from "./firebase_conf";

const useFirestore = (userId) => {
  const [currentLobby, setCurrentLobby] = useState([]);
  const [players, setPlayers] = useState([]);
  const [url, setUrl] = useState([]);

  useEffect(() => {
    let id = "" + userId + ".id";

    projectFirestore
      .collection("lobby")
      .where(id, "==", userId)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setCurrentLobby(doc.id);
          setPlayers(Object.values(doc.data()));
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    projectFirestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc && doc.exists) {
          setUrl(doc.get("url"));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return { currentLobby, players, setPlayers, url };
};

export default useFirestore;
