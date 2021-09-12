import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: 'auto',
        width: '60%',
      }},
    margins: {
      marginTop: 30,
      marginBottom: 20,
    },
  }),
);
    
function Task() {
  const classes = useStyles();
  let { taskId } = useParams<{ taskId: any }>();
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
        <section className={classes.root}>
              {task && 
                  <div className={classes.margins}>
                    <h2>YOUR TASK</h2>
                    <h3>
                      <span>
                        <b>{task.title}</b>
                      </span>
                    </h3>
                    <p className={classes.margins}>
                      {task.isDone ? "Yes" : "No"}
                    </p>
                    <p className={classes.margins}>
                      {task.priority}
                    </p>
                    <p className={classes.margins}>
                      {task.description}
                    </p>
                    <p className={classes.margins}>
                      {task.startDate}
                    </p>
                    <p className={classes.margins}>
                      {task.endDate}
                    </p>
                  </div>        
              }
      </section>
    );
}
export default Task;