import React, { SyntheticEvent, useState } from "react";
import Activity from "../../../models/activity";
import { Button, Item, Label, List, Segment } from "semantic-ui-react";

export interface Props {
    activities: Activity[];
    selectedActivity: Activity  | undefined;
    selectActivity: (id:string)=>void;
    cancelSelectActivity :() => void;
    deleteActivity: (id:string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectedActivity, submitting, selectActivity, cancelSelectActivity,deleteActivity }: Props) {
    
    const [target, setTarget] = useState('');

    function delActivity(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>

                {activities.map((activity) => (

                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" color="blue" onClick={()=>selectActivity((activity.id))} >View</Button>
                                <Button name={activity.id} loading={submitting && target === activity.id} floated="right" color="red" onClick={(e)=>delActivity(e,activity.id)} >Delete</Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>

                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment >

    );
}