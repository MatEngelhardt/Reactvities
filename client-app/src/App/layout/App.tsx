import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import Activity from '../../models/activity';
import Navbar from './Navbar';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';
import { Agent } from '../api/agent';
import LoadingComponent from './loadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Agent.Activities.list().then(response =>{
      response.forEach(r=>r.date = r.date.split('T')[0]);
      setActivities(response);
      setLoading(false);
    })
  }, [])

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleSelectActivity(id: string) {
    setselectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setselectedActivity(undefined);
  }

  function handleCreateOrEditActivity(activity: Activity) {

    setSubmitting(true);

    if(activity.id)
    {
      Agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setEditMode(false);
        setselectedActivity(activity);
        setSubmitting(false);
      });
    }
    else{
      activity.id = uuid();
      Agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setselectedActivity(activity);
        setSubmitting(false);
        setEditMode(false);
      });
    }
  }


  function handleDeleteActivity(id:string)
  {
    setSubmitting(true);
    Agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a=>a.id !== id)]);
      setSubmitting(false);
    });
  }

  if(loading) return(<LoadingComponent content='Loading app'/>)

  return (
    <>
      <Navbar openForm={() => handleFormOpen()} />

      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          activities={activities}
          openForm={handleFormOpen}
          editMode={editMode}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity} 
          deleteActivity={handleDeleteActivity}
          submitting={submitting}/>
      </Container>
    </>
  )
}
export default App
