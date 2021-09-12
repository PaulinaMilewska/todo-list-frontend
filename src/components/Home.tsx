import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTasks } from './data/FetchData';
import { useSortCompleted } from './data/FetchData';
    
function Home():JSX.Element {
  let history = useHistory()
  let initTasks = useTasks();
  let sortedTasks = useSortCompleted();
  const [tasks, setTasks] = useState(initTasks);
  const [isSorted, setIsSorted] = useState(false);
  const [btnText, setBtnText] = useState("SORT BY COMPLETED TASKS");
  
  useEffect(() => {
    if(isSorted === false){
      setTasks(initTasks);
    } else {
      setTasks(sortedTasks);
    }
  });

  if (!tasks) {
    return <p>Loading...</p>;
  }

  const sortByCompleted = () => {
    if(isSorted === false){
      setIsSorted(true);
      setTasks(sortedTasks);
      setBtnText("BACK SORT");
    } else {
      setIsSorted(false);
      setTasks(initTasks);
      setBtnText("SORT BY COMPLETED TASKS");
    }
    
  }
    
  const deleteTask = async(id: string) => {
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/delete?taskID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    });
    _removeTaskFromView(id);
    history.push('/');
  }
    
  const _removeTaskFromView = (id: string) => {
    const index = tasks.findIndex((task: { _id: string; }) => task._id === id);
    tasks.splice(index, 1);
  }

  return (
    <section className="blog-area section">
    <div className="container">
    <div>
      <button className="sortBtn" type="button" onClick={sortByCompleted}>{btnText}</button>
      </div>
      <div className="row">
        {tasks && tasks.map((task: { isDone: React.ReactNode; title: React.ReactNode;  _id: any; }) => (
          <div className="col-lg-4 col-md-6" key={task._id}>
          <div className="card h-100">
            <div className="single-post post-style-1">
              <div className="blog-image">
                <img src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" alt="Desk" />
              </div>
              <span className="avatar">
                <img src="https://st.depositphotos.com/1168906/1382/v/600/depositphotos_13820804-stock-illustration-writing-quill-with-ink-blot.jpg" alt="Profile" />
              </span>
              <div className="blog-info">
                <h4 className="title">
                  <span>
                    <b>{task.title}</b>
                  </span>
                </h4>
                <h4 className="title">
                  <span>
                    <b>{task.isDone ? <img src="https://www.freeiconspng.com/thumbs/ok-icon/check-yes-ok-icon-10.png" alt="Ok icon" style={{height: "50px"}}/> : <img src="https://pngimage.net/wp-content/uploads/2018/06/no-photo-icon-png-3.png" alt="Not ok icon" style={{height: "50px"}}/>}</b>
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
                  <Link to={`/edit/${task._id}`} className="btn btn-sm btn-outline-secondary">Edit Task </Link>
                }
              </li>
              <li>
                {
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