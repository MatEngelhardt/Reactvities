import { Grid } from "semantic-ui-react";
import ActivityList from "./acrtivityList";
import { useStore} from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import ActivityFilters from "./activitiyFilters";


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {loadActivities,activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1)
            loadActivities();
    }, [loadActivities, activityRegistry.size])
  
    if(activityStore.loadingInitial) return(<LoadingComponent content='Loading app'/>)

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    );
})