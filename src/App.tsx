import React from 'react'
import Styled from 'styled-components/native'
import Counter from './Screens/Counter'
import { TodoListContextProvider } from './Context/TodoListContext'
import Todo from './Screens/Todo'

const Container = Styled.View`
  flex: 1;
  background-color: #eee;
`

interface Props {}

const App = ({}: Props) => {
  return (
    <TodoListContextProvider>
      <Container>
        <Todo />
      </Container>
    </TodoListContextProvider>
  )
}

export default App
