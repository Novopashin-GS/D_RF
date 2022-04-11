import React from 'react'

class ProjectForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'name': '', 'users': []}
  }
  handleSubmit(event){
    this.props.newProject(this.state.name, this.state.users)
    event.preventDefault()
  }
  handleChangeName(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  handleChangeUsers(event){
    if (!event.target.selectedOptions) {
        return
    }
    let users = []
    for (let i=0; i < event.target.selectedOptions.length; i++) {
        users.push(event.target.selectedOptions.item(i).value)
    }

    this.setState({
        'users': users
    })
  }

  render() {
    return(
        <form onSubmit={(event)=>this.handleSubmit(event)}>
          <input type='text' name='name' placeholder='name' value={this.state.name}
                 onChange={(event)=>this.handleChangeName(event)}/>
          <select multiple onChange={(event => this.handleChangeUsers(event))}>
              {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option> )}
          </select>
          <input type='submit' value='Create'/>
        </form>
    )
  }
}

export default ProjectForm
