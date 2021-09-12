import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTasks } from './data/FetchData';
import { useSortCompleted } from './data/FetchData';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 260,
      width: 330,
    },
    control: {
      padding: theme.spacing(2),
    },
    sortBtn: {
      marginTop: 30,
      marginBottom: 30,
    },
    
  }),
);
    
function Home():JSX.Element {
  const classes = useStyles();
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
    <>
      <div className={classes.sortBtn}>
          <Button variant="contained" color="primary" onClick={sortByCompleted}>{btnText}</Button>
      </div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {tasks && tasks.map((task: { isDone: React.ReactNode; title: React.ReactNode;  _id: any; }) => (
              <Grid key={task._id} item>
                <Paper className={classes.paper} >
                  <img src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80" style={{height: "150px"}} alt="Desk" />
                  <h4>
                    <span>
                      <b>{task.title}</b>
                    </span>
                  </h4>
                  <span>
                    <b>{task.isDone ? <img src="https://www.freeiconspng.com/thumbs/ok-icon/check-yes-ok-icon-10.png" alt="Ok icon" style={{height: "50px"}}/> : <img src="https://pngimage.net/wp-content/uploads/2018/06/no-photo-icon-png-3.png" alt="Not ok icon" style={{height: "50px"}}/>}</b>
                  </span>
                </Paper>
                <ul>
                  <li>
                    <Button variant="contained"><Link to={`/task/${task._id}`}>View Task </Link></Button>
                  </li>
                  <li>
                    {
                      <Button variant="contained"><Link to={`/edit/${task._id}`}>Edit Task </Link></Button>
                    }
                  </li>
                  <li>
                    {
                      <Button variant="contained" onClick={() => deleteTask(task._id)}>Delete Task</Button>
                    }
                  </li>
              </ul>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
  </>
);
}
export default Home;