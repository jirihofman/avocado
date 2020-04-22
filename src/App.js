import React, { useState } from 'react'
import './App.css'
import NavBar from './Dashboard/NavBar'
import Button from '@material/react-button'
import GridList from '@material-ui/core/GridList'
import Card, {
  CardPrimaryContent,
  CardActions,
  CardActionButtons
} from '@material/react-card'
import { Cell, Grid, Row } from '@material/react-layout-grid'

// CSS pak rozhodit ke komponentam
import '@material/react-button/dist/button.css'
import '@material/react-card/dist/card.css'
import '@material/react-layout-grid/dist/layout-grid.css'
import '@material/react-text-field/dist/text-field.css'
import TextField, { HelperText, Input } from '@material/react-text-field'
// import MaterialIcon from '@material/react-material-icon'

function App () {
  const [value, setValue] = useState('')

  return (
    <div>
      <NavBar />
      <Row>
        <Cell columns={12}>

          <GridList cellHeight={160} cols={2}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card outlined className='mdc-card demo-card'>
                <CardPrimaryContent><h2>Matematika</h2></CardPrimaryContent>
                <CardActions>
                  <CardActionButtons>
                    <Button raised>Sčítání</Button>
                    <Button disabled raised>Odčítání</Button>
                    <Button disabled raised>Malá násobilka</Button>
                    <Button disabled raised>Velká násobilka</Button>
                  </CardActionButtons>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card className='mdc-card demo-card'>
                <CardPrimaryContent><h2>Čeština</h2></CardPrimaryContent>
                <CardActions>
                  <CardActionButtons>
                    <Button disabled raised onClick={() => { alert(111) }}>Read</Button>
                    <Button disabled raised>Bookmark</Button>
                  </CardActionButtons>
                </CardActions>
              </Card>
            </Grid>
          </GridList>
        </Cell>
      </Row>
      <Row style={{ display: 'none' }}>
        <Cell>
          <h1>Vyplnovaci oblast</h1>
          <span>5 + 4 = </span>
          <TextField
            // ref={focusUsernameInputField}
            label='Výsledek'
            // inputProps={{ autoFocus: true }}
            autoFocus
            helperText={<HelperText>Zadej a stiskni Enter pro potvrzení</HelperText>}
          >
            <Input value={value} onChange={e => setValue(e.target.value)} />
          </TextField>
        </Cell>
      </Row>
      <div />
    </div>
  )
}

export default App
