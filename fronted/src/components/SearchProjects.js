import React from "react";

const ProjectItem = ({project, deleteProjects}) => {
    return (
    <tr>
        <td>{project.name}</td>
        <td>{project.users.join(', ')}</td>
        <button onClick={() => deleteProjects(project.id)}>Delete</button>
    </tr>
    )
}

const ProjectList = ({projects, deleteProjects}) => {
    return (
        <table>
            <th>Project name</th>
            <th>Users</th>
            {projects.map((project) => <ProjectItem project={project} deleteProjects={deleteProjects} />)}
        </table>
    )
}

class SearchProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {'name': ''}
  }
  handleSubmit(event){
    this.props.search(this.state.name)
    event.preventDefault()
  }
  handleChangeName(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  render() {
    return(
        <div>
        <form onSubmit={(event)=>this.handleSubmit(event)}>
          <input type='text' name='name' placeholder='name' value={this.state.name}
                 onChange={(event)=>this.handleChangeName(event)}/>
          <input type='submit' value='Search'/>
        </form>
            <ProjectList projects={this.props.searchProjects} deleteProjects={this.props.deleteProjects}/>
      </div>
    )
  }
}
export default SearchProject
