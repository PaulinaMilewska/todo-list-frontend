import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';
    
function Home():JSX.Element {
  let history = useHistory()
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [tasks, setTasks] = useState();
    
  const deleteTask = async(id: string) => {
    const accessToken = await getIdTokenClaims();
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/delete?taskID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "authorization": `Bearer ${accessToken.__raw}`
      })
    });
    _removeTaskFromView(id);
    history.push('/');
  }
    
  const _removeTaskFromView = (id: string) => {
    const index = tasks.findIndex((task: { _id: string; }) => task._id === id);
    tasks.splice(index, 1);
  }
    
  useEffect(() => {
    const fetchTasks = async (): Promise<any> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/tasks`);
      const json = await response.json();
      setTasks(json)
    }
    fetchTasks();
  }, [])
  return (
    <section className="blog-area section">
    <div className="container">
      <div className="row">
        {tasks && tasks.map((task: { title: React.ReactNode; _id: any; }) => (
          <div className="col-lg-4 col-md-6" key={task._id}>
          <div className="card h-100">
            <div className="single-post post-style-1">
              <div className="blog-image">
                <img src="https://images.ctfassets.net/23aumh6u8s0i/7stduDuP1cBQXQpmzaBMTd/6f589aa58fe112ced6e1a3901a9c3dad/blog-image_psvipq" alt="Blog" />
              </div>
              <span className="avatar">
                <img src="https://images.ctfassets.net/23aumh6u8s0i/5RgCRgruCESPZUobN5RL6G/a8082500f2e6dc7fb4007c0cdfd0cbe3/WEB_FREAK_50PX-01_yaqxg7" alt="Profile" />
              </span>
              <div className="blog-info">
                <h4 className="title">
                  <span>
                    <b>{task.title}</b>
                  </span>
                </h4>
              </div>
            </div>
            <ul className="post-footer">
              <li>
                <Link to={`/task/${task._id}`} className="btn btn-sm btn-outline-secondary">View Task </Link>
              </li>
              <li>
                {
                  isAuthenticated &&
                  <Link to={`/edit/${task._id}`} className="btn btn-sm btn-outline-secondary">Edit Task </Link>
                }
              </li>
              <li>
                {
                  isAuthenticated &&
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => deleteTask(task._id)}>Delete Task</button>
                }
              </li>
            </ul>
          </div>
        </div>
        ))}
      </div>
    </div>
  </section>
);
}
export default Home;