import React from 'react'
import "./header.css"
import Typography from '@material-ui/core/Typography'
import 'fontsource-roboto';

const Header = () => {
  return (
    <header className='center'>
      <Typography variant='h1' style={{paddingTop: '40px'}}>Game Lobby</Typography>
    </header>
  )
}

export default Header
