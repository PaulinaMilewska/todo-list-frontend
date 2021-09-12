import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDoneTasks } from '../data/FetchData';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: 'auto',
        width: '60%',
      }},
    alertInfo: {
      color: '#0c5460',
      backgroundColor: '#d1ecf1',
      borderColor: '#bee5eb',
      paddingTop: 10,
      paddingBottom: 10,
    },
    formControl: {
      display: 'block',
      width: '100%',
      height: 'calc(2.25rem + 2px)',
      padding: '.375rem .75rem',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#495057',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid #ced4da',
      borderRadius: '.25rem',
    },
    btnSubmit: {
      marginTop: 10,
      marginBottom: 10,
      color: 'white',
    }
  }),
);
    
function Create(): JSX.Element {
  const classes = useStyles();
  let history = useHistory();
  const doneTasks: any = useDoneTasks();
    
  interface IValues {
    [key: string]: any;
  }
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title: values.title,
      description: values.description,
      isDone: values.isDone,
      priority: values.priority,
      startDate: values.startDate,
      endDate: values.endDate
    }
    const submitSuccess: boolean = await submitform(formData);
    setSubmitSuccess(submitSuccess);
    setValues({...values, formData});
    setLoading(false);
    // setTimeout(() => {
    //   history.push('/');
    // }, 1500);
  }

  const submitform = async (formData: {}) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/task`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
        }),
        body: JSON.stringify(formData)
        
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }
  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }
  const handleCheckboxChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(!checkboxValue);
    setFormValues({ [e.currentTarget.name]: !checkboxValue });
    // console.log("EVENT", e.currentTarget.name, !checkboxValue ? "true" : "false");

    let actualDoneTasks = doneTasks;
    const createdTask = {
      _id: "not created yet",
      title: values.title || "not created yet",
      description: values.description || "not created yet",
      priority: values.priority || "not created yet",
      startDate: values.startDate || "not created yet",
      endDate: values.endDate || "not created yet",
    }
      if(!checkboxValue === true) {
        const data = {...values, ...createdTask};
        actualDoneTasks = [...doneTasks, data];
      }
    
    console.log(`--- DONE TASKS length: ${actualDoneTasks.length} ---`);
    actualDoneTasks.map((task: any) => {
      console.log(`Task id: ${task._id}, Title: ${task.title}, Description: ${task.description}, Priority: ${task.priority}, Start date: ${task.startDate}, End date: ${task.endDate}`)
    })
  }
  return (
    <div className={classes.root}>
      <h2> Create Task </h2>
      {!submitSuccess && (
        <div className={classes.alertInfo} role="alert">
          Fill the form below to create a new task.
        </div>
      )}
      {submitSuccess && (
        <div className={classes.alertInfo} role="alert">
          The form was successfully submitted!
        </div>
      )}
      <form id={"create-todo-form"} onSubmit={handleFormSubmission} noValidate={true}>
        <div>
          <label htmlFor="title"> Title </label>
          <input type="text" id="title" onChange={(e) => handleInputChanges(e)} name="title" className={classes.formControl} placeholder="Enter title" />
        </div>
        <div>
          <label htmlFor="description"> Description </label>
          <input type="text" id="description" onChange={(e) => handleInputChanges(e)} name="description" className={classes.formControl} placeholder="Enter Description" />
        </div>
        <div>
          <label htmlFor="isDone"> Is done? </label>
          <input type="checkbox" id="isDone"
          onChange={(e) => handleCheckboxChanges(e)} 
          checked={checkboxValue}
          name="isDone" className={classes.formControl} />
        </div>
        <div>
          <label htmlFor="priority"> Priority </label>
          <input type="text" id="priority" onChange={(e) => handleInputChanges(e)} name="priority" className={classes.formControl} placeholder="Enter priority" />
        </div>
        <div>
          <label htmlFor="startDate"> Start date </label>
          <input type="text" id="startDate" onChange={(e) => handleInputChanges(e)} name="startDate" className={classes.formControl} placeholder="Enter Start Date" />
        </div>
        <div>
          <label htmlFor="endDate"> End date </label>
          <input type="text" id="endDate" onChange={(e) => handleInputChanges(e)} name="endDate" className={classes.formControl} placeholder="Enter End Date" />
        </div>
        <div className={classes.btnSubmit}>
          <Button variant="contained" color="primary" type="submit">
            Create Task
          </Button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
        </div>
      </form>
    </div>
  );
}
export default withRouter(Create)