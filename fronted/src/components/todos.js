import React from "react";

const TodoItem = ({todo, deleteTodos}) => {
    return (
    <tr>
        <td>{todo.project.map((to)=>to.id).join(', ')}</td>
        <td>{todo.text}</td>
        <td>{todo.user}</td>
        <td>{todo.is_active ? '1':'0'}</td>
        <button onClick={() => deleteTodos(todo.id)}>Delete</button>
    </tr>
    )
}

const TodoList = ({todos, deleteTodos}) => {
    return (
        <table>
            <th>Todo project</th>
            <th>Todo text</th>
            <th>User</th>
            <th>Active</th>
            {todos.map((todo) => <TodoItem todo={todo} deleteTodos={deleteTodos}/>)}
        </table>
    )
}
export default TodoList