import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from 'axios';
import UserList from './components/users.js';
import TodoList from './components/todos.js';
import ProjectList from './components/projects.js';
import UserTodoList from './components/userTodo.js';
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from "react-router-dom";
import LoginForm from "./components/LoginForm";

const NotFound = () => {
    let location = useLocation()
    return (
        <div>Page {location.pathname} not Found</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [], 'todos': [], 'projects': [], 'token': ''
        }
    }

    getData() {
        let headers = this.getHeader()
        axios.get('http://127.0.0.1:7000/api/users/', {headers}).then(response => {
            const users = response.data.results
            this.setState({'users': users})
        }).catch(error => {
            console.log(error)
            this.setState({'users': []})
        })

        axios.get('http://127.0.0.1:7000/api/todos/', {headers}).then(response => {
            const todos = response.data.results
            this.setState({'todos': todos})
        }).catch(error => {
            console.log(error)
            this.setState({'todos': []})
        })

        axios.get('http://127.0.0.1:7000/api/projects/', {headers}).then(response => {
            const projects = response.data.results
            this.setState({'projects': projects})
        }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })

    }

    getToken(login, password) {
        axios.post('http://127.0.0.1:7000/api-token-auth/', {'username': login, 'password': password}).then
        (response => {
            localStorage.setItem('token', response.data.token)
            this.setState({'token': response.data.token}, this.getData)
        }).catch(error => console.log(error))
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    logout() {
        this.setState({'token': ''}, this.getData)
    }

    componentDidMount() {
        this.setState({'token': localStorage.getItem('token')}, this.getData)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li>{this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}</li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' element={<LoginForm getToken={(login, password) => {
                            this.getToken(login, password)
                        }}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/users' element={<Navigate to='/'/>}/>
                        <Route path='/user/:id' element={<UserTodoList todos={this.state.todos}/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
