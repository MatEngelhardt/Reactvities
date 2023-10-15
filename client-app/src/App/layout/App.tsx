import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import Activity from '../../models/activity';
import Navbar from './Navbar';
import { v4 as uuid } from 'uuid';
import ActivityDashboard from '../../features/activities/dashboard/activityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
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

    activity.id
      ? setActivities([...activities.filter(a => a.id !== activity.id), activity])
      : setActivities([...activities, {...activity,id:uuid()}]);

      setEditMode(false);
      setselectedActivity(activity);
  }


  function handleDeleteActivity(id:string)
  {
    setActivities([...activities.filter(a=>a.id !== id)]);
  }

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
          deleteActivity={handleDeleteActivity}/>
      </Container>
    </>
  )
}
export default App
