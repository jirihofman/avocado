import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

function NavBar () {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' color='inherit'>
            <span role='img' aria-label='avocado'>🥑</span> Výuková aplikace
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default NavBar
