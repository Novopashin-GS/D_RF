import React from "react";
import {useParams} from "react-router-dom";

const TodoItem = ({todo}) => {
    return (
    <tr>
        <td>{todo.project.map((to)=>to.id).join(', ')}</td>
        <td>{todo.text}</td>
        <td>{todo.user}</td>
        <td>{todo.is_active ? '1':'0'}</td>
    </tr>
    )
}

const UserTodoList = ({todos}) => {
    var {id} = useParams()
    var filteredTodos = todos.filter((todo)=>todo.user === parseInt(id))
    return (
        <table>
            <th>Todo project</th>
            <th>Todo text</th>
            <th>User</th>
            <th>Active</th>
            {filteredTodos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default UserTodoList