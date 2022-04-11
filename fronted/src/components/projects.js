import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
    <tr>
        <td>{project.name}</td>
        <td>{project.users.join(', ')}</td>
        <button onClick={() => deleteProject(project.id)}>Delete</button>
    </tr>
    )
}

const ProjectList = ({projects, deleteProjects}) => {
    return (
        <div>
        <table>
            <th>Project name</th>
            <th>Users</th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProjects}/>)}
        </table>
    <Link to='/search_projects'>Search project</Link>
    </div>
    )
}
export default ProjectList