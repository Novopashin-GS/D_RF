import React from 'react'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'text': '', 'projects': [], 'user': 0}
  }
  handleSubmit(event){
    this.props.newTodo(this.state.projects, this.state.text, this.state.user)
    event.preventDefault()
  }
  handleChangeName(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleChangeProjects(event){
    if (!event.target.selectedOptions) {
        return
    }
    let projects = []
    for (let i=0; i < event.target.selectedOptions.length; i++) {
        projects.push(event.target.selectedOptions.item(i).value)
    }

    this.setState({
        'projects': projects
    })
  }

  handleChangeUser(event){
    this.setState({
        'user': parseInt(event.target.selectedOptions.item(0).value)
    })
  }

  render() {
    return(
        <form onSubmit={(event)=>this.handleSubmit(event)}>
          <input type='text' name='text' placeholder='text' value={this.state.text}
                 onChange={(event)=>this.handleChangeName(event)}/>
          <select multiple onChange={(event => this.handleChangeProjects(event))}>
              {this.props.project.map((project) => <option value={project.id}>{project.name}</option> )}
          </select>
          <select onChange={(event => this.handleChangeUser(event))}>
              {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option> )}
          </select>
          <input type='submit' value='Create'/>
        </form>
    )
  }
}

export default TodoForm
