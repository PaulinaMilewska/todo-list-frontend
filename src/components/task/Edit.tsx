import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';
    
function Edit(): JSX.Element {
  const { getIdTokenClaims } = useAuth0();
  let history = useHistory();
  let { taskId } = useParams();
    
  interface IValues {
    [key: string]: any;
  }
    
  const [task, setTask] = useState()
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/task/${taskId}`);
      const json = await response.json();
      setTask(json)    
    }
    fetchData();    
  }, [taskId]);
    
  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const submitSuccess: boolean = await submitForm();
    setSubmitSuccess(submitSuccess);
    setLoading(false);
    setTimeout(() => {
      history.push('/');
    }, 1500);
  }
  const submitForm = async (): Promise<boolean> => {
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/todo/edit?taskId=${taskId}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(values)
      });
      return response.ok;      
    } catch(ex) {
      return false;
    }
  }
  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }
  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value })
  }
  return (
    <div className={'page-wrapper'}>
    {task &&
      <div className={"col-md-12 form-wrapper"}>
        <h2> Edit Task  </h2>
        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The task has been edited successfully!
                        </div>
        )}
        <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
          <div className="form-group col-md-12">
            <label htmlFor="title"> Title </label>
            <input type="text" id="title" defaultValue={task.title} onChange={(e) => handleInputChanges(e)} name="title" className="form-control" placeholder="Enter title" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="description"> Description </label>
            <input type="text" id="description" defaultValue={task.description} onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="isDone"> Is done? </label>
            <input type="checkbox" id="isDone" onChange={(e) => handleInputChanges(e)} name="isDone" className="form-control" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="priority"> Priority </label>
            <input type="number" id="priority" defaultValue={task.priority} onChange={(e) => handleInputChanges(e)} name="priority" className="form-control" placeholder="Enter Priority" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="startDate"> Start date </label>
            <input type="date" id="startDate" defaultValue={task.startDate} onChange={(e) => handleInputChanges(e)} name="startDate" className="form-control" placeholder="Enter Start Date" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="endDate"> End date </label>
            <input type="date" id="endDate" defaultValue={task.endDate} onChange={(e) => handleInputChanges(e)} name="endDate" className="form-control" placeholder="Enter End Date" />
          </div>
          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Edit Task
            </button>
            {loading &&
              <span className="fa fa-circle-o-notch fa-spin" />
            }
          </div>
        </form>
      </div>
    }
  </div>
  )
}
export default Edit;