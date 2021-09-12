import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDoneTasks } from '../data/FetchData';
    
function Create(): JSX.Element {
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
    <div>
    <div className={"col-md-12 form-wrapper"}>
      <h2> Create Task </h2>
      {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Fill the form below to create a new task.
                </div>
      )}
      {submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was successfully submitted!
                        </div>
      )}
      <form id={"create-todo-form"} onSubmit={handleFormSubmission} noValidate={true}>
        <div className="form-group col-md-12">
          <label htmlFor="title"> Title </label>
          <input type="text" id="title" onChange={(e) => handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="description"> Description </label>
          <input type="text" id="description" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="isDone"> Is done? </label>
          <input type="checkbox" id="isDone"
          onChange={(e) => handleCheckboxChanges(e)} 
          checked={checkboxValue}
          name="isDone" className="form-control" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="priority"> Priority </label>
          <input type="text" id="priority" onChange={(e) => handleInputChanges(e)} name="priority" className="form-control" placeholder="Enter priority" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="startDate"> Start date </label>
          <input type="text" id="startDate" onChange={(e) => handleInputChanges(e)} name="startDate" className="form-control" placeholder="Enter Start Date" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="endDate"> End date </label>
          <input type="text" id="endDate" onChange={(e) => handleInputChanges(e)} name="endDate" className="form-control" placeholder="Enter End Date" />
        </div>
        <div className="form-group col-md-4 pull-right">
          <button className="btn btn-success" type="submit">
            Create Task
          </button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
        </div>
      </form>
    </div>
  </div>
  );
}
export default withRouter(Create)