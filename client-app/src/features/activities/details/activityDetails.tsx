import React from "react";
import { Button, Icon, Image } from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import Activity from "../../../models/activity";

interface Props{
    activity:Activity;
    cancelSelectActivity: ()=>void;
    openEdit: (id:string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity,openEdit}:Props) {

    

    return (
        <Card fluid> 
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic onClick={()=>openEdit(activity.id)} color='blue' content="Edit"/>
                    <Button basic color='grey' content="Cancel" onClick={cancelSelectActivity}/>
                </Button.Group>
            </Card.Content>
        </Card>
    );

}