import { Button, Image } from "semantic-ui-react";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import { useStore } from "../../../app/stores/stores";



export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity} = activityStore

    if(selectedActivity == undefined) return (<></>)

    return (
        <Card fluid> 
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic onClick={()=>activityStore.formOpen(selectedActivity.id)} color='blue' content="Edit"/>
                    <Button basic color='grey' content="Cancel" onClick={activityStore.handleCancelSelectActivity}/>
                </Button.Group>
            </Card.Content>
        </Card>
    );

}