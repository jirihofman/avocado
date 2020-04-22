import React, { useState } from 'react'
import './App.css'
import D from './Dashboard'
import Button from '@material-ui/core/Button'
import Card, {
  CardPrimaryContent,
  CardActions,
  CardActionButtons
} from '@material/react-card'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

function Todo ({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className='todo'
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  )
}

function TodoForm ({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function App () {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false
    }
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true
    setTodos(newTodos)
  }

  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <h1>Vyukovy program</h1>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <D />
      </div>
      <hr />
      <Card outlined className='mdc-card demo-card'>
        <CardPrimaryContent>Matematika</CardPrimaryContent>
        <CardActions>
          <CardActionButtons>
            <Button>Read</Button>
            <Button>Bookmark</Button>
          </CardActionButtons>
        </CardActions>
      </Card>
      <Card className='mdc-card demo-card'>
        <CardPrimaryContent>Matematika</CardPrimaryContent>
        <CardActions>
          <CardActionButtons>
            <Button>Read</Button>
            <Button>Bookmark</Button>
          </CardActionButtons>
        </CardActions>
      </Card>
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              React & Material-UI Sample Application
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}

export default App
