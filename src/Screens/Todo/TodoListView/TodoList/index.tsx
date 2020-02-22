import React, { useContext } from 'react'
import Styled from 'styled-components/native'
import { TodoListContext } from '~/Context/TodoListContext'
import EmptyItem from './EmptyItem'
import TodoItem from './TodoItem'
import { FlatList } from 'react-native'

const Container = Styled(FlatList)``

interface Props {}

const TodoList = ({}: Props) => {
  const { todoList, removeTodoList } = useContext<ITodoListContext>(
    TodoListContext
  )
  return (
    <Container
      data={todoList}
      keyExtractor={(item, index) => `todo-${index}`}
      ListEmptyComponent={<EmptyItem />}
      renderItem={({ item, index }) => (
        <TodoItem
          text={item as string}
          onDelete={() => removeTodoList(index)}
        />
      )}
      contentContainerStyle={!todoList.length && { flex: 1 }}
    ></Container>
  )
}

export default TodoList
