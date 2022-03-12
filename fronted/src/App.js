import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from 'axios';
import UserList from './components/users.js';
import TodoList from './components/todos.js';
import ProjectList from './components/projects.js';
import UserTodoList from './components/userTodo.js';
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from "react-router-dom";

const NotFound = () => {
    let location = useLocation()
    return(
        <div>Page {location.pathname} not Found</div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'users': [], 'todos': [], 'projects': []
    }
  }
  componentDidMount() {
      axios.get('http://127.0.0.1:7000/api/users/').then(response =>
    {const users = response.data.results
      this.setState({'users': users})
    }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:7000/api/todos/').then(response =>
    {const todos = response.data.results
      this.setState({'todos': todos})
    }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:7000/api/projects/').then(response =>
    {const projects = response.data.results
      this.setState({'projects': projects})
    }).catch(error => console.log(error))

  }
  render() {
    return (
        <div>
          <BrowserRouter>
              <nav>
                  <li><Link to='/'>Users</Link></li>
                  <li><Link to='/todos'>Todos</Link></li>
                  <li><Link to='/projects'>Projects</Link></li>
              </nav>
              <Routes>
                  <Route exact path = '/' element = {<UserList users={this.state.users}/>}/>
                  <Route exact path = '/todos' element = {<TodoList todos={this.state.todos}/>}/>
                  <Route exact path = '/projects' element = {<ProjectList projects={this.state.projects}/>}/>
                  <Route exact path = '/users' element = {<Navigate to='/'/>}/>
                  <Route path = '/user/:id' element = {<UserTodoList todos={this.state.todos}/>}/>
                  <Route path = '*' element = {<NotFound/>}/>
              </Routes>
          </BrowserRouter>
        </div>
    )
  }
}

export default App;
