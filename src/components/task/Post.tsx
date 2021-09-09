import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
    
function Task() {
  let { taskId } = useParams();
  const [task, setTask] = useState<any>({});
    
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/task/${taskId}`);
      const json = await response.json();
      setTask(json);
    }
    fetchData();
  }, [taskId]);
    
    return (
        <section className="post-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {task && 
                <div className="main-post">
                  <div className="post-top-area">
                    <h5 className="pre-title">Nest React Blog</h5>
                    <h3 className="title">
                      <span>
                        <b>{task.title}</b>
                      </span>
                    </h3>
                    <p className="para">
                      {task.description}
                    </p>
                  </div>
                </div>              
              }
            </div>
          </div>
        </div>
      </section>
    );
}
export default Task;