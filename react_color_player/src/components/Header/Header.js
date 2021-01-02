import React, {useState} from "react";
import "./header.css";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";
import { motion } from "framer-motion";
import {projectFirestore} from '../Firebase/firebase_conf';

const Header = () => {
  const [currentUsers, setCurrentUsers] = useState(null);


  
  projectFirestore.collection('counters').doc('userCounter').onSnapshot(function(doc){
    setCurrentUsers(doc.get('count'));
  }); 
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <header className="center">
        <Typography variant="h1" style={{ paddingTop: "30px" }}>
          Game Lobby
        </Typography>
          <Typography variant="h4" style={{ paddingTop: "10px" }}>
            Current Users: {currentUsers}
          </Typography>
      </header>
    </motion.div>
  );
};

export default Header;
