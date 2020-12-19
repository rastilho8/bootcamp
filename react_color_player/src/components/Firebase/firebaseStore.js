import {useState, useEffect} from 'react';
import { projectFirestore } from './firebase_conf';

const useFirestore = (userId) => {
  const [currentLobby, setCurrentLobby] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {

      let id = "" + userId + ".id";
        projectFirestore
        .collection("lobby")
        .where(id, "==", userId).get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            setCurrentLobby(doc.id);
            setPlayers(Object.values(doc.data()));
          })
        }).catch(function(error){
          console.log(error);
        })
      
      return;

  }, []);

  return { currentLobby, players, setPlayers };
}

export default useFirestore;