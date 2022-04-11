import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from 'axios';
import UserList from './components/users.js';
import TodoList from './components/todos.js';
import SearchProject from './components/SearchProjects.js';
import UserTodoList from './components/userTodo.js';
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import ProjectList from "./components/projects";

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
            'users': [], 'todos': [], 'projects': [], 'token': '', 'searchProjects': []
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

    deleteProject(id) {
        let headers = this.getHeader()
        axios.delete(`http://127.0.0.1:7000/api/projects/${id}`, {headers}).then(
            response => {this.setState({'projects': this.state.projects.filter(item => item.id !== id)})
            this.setState({'searchProjects': this.state.searchProjects.filter(item => item.id !== id)})}
        ).catch(error => console.log(error))
    }
    newProject(name, users) {
        let headers = this.getHeader()
        let data = {name:name, users:users}
        axios.post('http://127.0.0.1:7000/api/projects/', data, {headers}).then(
            response => {this.getData()}
        ).catch(error => {console.log(error)})
    }
    searchProject(name) {
        let headers = this.getHeader()
        axios.get(`http://127.0.0.1:7000/api/projects/?name__contains=${name}`,{headers}).then(
            response => { const searchProjects = response.data.results
            this.setState({'searchProjects': searchProjects})
        }).catch(error => {
            console.log(error)
            this.setState({'searchProjects': []})
        })

            }

    deleteTodo(id) {
        let headers = this.getHeader()
        axios.delete(`http://127.0.0.1:7000/api/todos/${id}`, {headers}).then(
            response => {this.setState({'todos': this.state.todos.filter(item => item.id !== id)})}
        ).catch(error => console.log(error))
    }
    newTodo(project, text, user) {
        let headers = this.getHeader()
        let data = {project: project, text: text, user: user}
        axios.post('http://127.0.0.1:7000/api/todos/', data, {headers}).then(
            response => {this.getData()}
        ).catch(error => {console.log(error)})
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/create_project'>Create project</Link></li>
                        <li><Link to='/create_todo'>Create todo</Link></li>
                        <li>{this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}</li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/create_todo' element={<TodoForm newTodo={(project, text, user) =>
                        this.newTodo(project, text, user)} project={this.state.projects} users={this.state.users}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos} deleteTodos={(id) =>
                            this.deleteTodo(id)}/>}/>
                        <Route exact path='/login' element={<LoginForm getToken={(login, password) => {
                            this.getToken(login, password)
                        }}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                            deleteProjects={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/create_project' element={<ProjectForm users={this.state.users}
                            newProject={(name, users) => this.newProject(name,users)}/>}/>
                        <Route exact path='/search_projects' element={<SearchProject deleteProjects={(id) =>
                            this.deleteProject(id)} searchProjects={this.state.searchProjects}
                        search={(name) => this.searchProject(name)}/>}/>
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
