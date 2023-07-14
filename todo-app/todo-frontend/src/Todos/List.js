import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => {
          return (
            <React.Fragment key={todo._id}>
              <Todo
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            </React.Fragment>
          )
        })
        .reduce((acc, cur) => [...acc, <hr key={acc} />, cur], [])}
    </>
  )
}

export default TodoList
