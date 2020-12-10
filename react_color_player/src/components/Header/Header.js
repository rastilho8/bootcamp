import React from 'react'
import "./header.css"
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto';
import {motion} from 'framer-motion';

const Header = () => {
  return (
    <motion.div
    initial={{scale: 0}}
    animate={{scale:1}}
    transition={{delay: 1}}
    >
    <header className='center'>
      <Typography variant='h1' style={{paddingTop: '40px'}}>Game Lobby</Typography>
    </header>
    </motion.div>
  )
}

export default Header
