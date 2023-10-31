import { Button, Grid, Image } from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import { useStore } from "../../../app/stores/stores";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./activityDetailedHeader";
import ActivityDetailedInfo from "./activityDetailedInfo";
import ActivityDetailedChat from "./activityDetailedChat";
import ActivityDetailedSidebar from "./activityDetailedSidebar";



export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore
    const {id} = useParams();

    useEffect(()=>{
        if(id) activityStore.loadActivity(id);
    },[id,loadActivity]);
    
    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
       <Grid>
        <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity}/>
            <ActivityDetailedInfo activity={activity}/>
            <ActivityDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetailedSidebar/>
        </Grid.Column>
       </Grid>
    );

})