import React from "react";
import Activity from "../../../models/activity";
import { Button, Item, Label, List, Segment } from "semantic-ui-react";

export interface Props {
    activities: Activity[];
    selectedActivity: Activity  | undefined;
    selectActivity: (id:string)=>void;
    cancelSelectActivity :() => void;
    deleteActivity: (id:string) => void;
}

export default function ActivityList({ activities, selectedActivity, selectActivity, cancelSelectActivity,deleteActivity }: Props) {
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
                                <Button floated="right" color="red" onClick={()=>deleteActivity((activity.id))} >Delete</Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>

                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment >

    );
}