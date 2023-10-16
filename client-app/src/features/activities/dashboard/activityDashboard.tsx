import Activity from "../../../models/activity";
import { Grid } from "semantic-ui-react";
import ActivityList from "./acrtivityList";
import ActivityDetails from "../details/activityDetails";
import ActivityForm from "../form/activityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id:string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, 
    selectActivity, cancelSelectActivity, editMode, submitting, openForm, closeForm, createOrEdit, deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    selectedActivity={selectedActivity}
                    selectActivity={selectActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    activities={activities} 
                    deleteActivity={deleteActivity}
                    submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openEdit={openForm}
                    />}

                {editMode &&
                    <ActivityForm
                        closeForm={closeForm} 
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    );
}