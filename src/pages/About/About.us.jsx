import './about.us.css';

import Project from '../../components/Project/Project'
import {projects} from './../../helpers/projectList.js';

const About = () => {
    return ( 
        <main className="section">
        <div className="container">
            <h2 className="title-1">Біз туралы</h2>
            <ul className="projects">
                {projects.map(( project, index ) => {
                    return (
                        <Project key={index}  title={project.title}  img={project.img} />
                    )
                })}


            </ul>
        </div>
    </main>
     );
}
 
export default About;