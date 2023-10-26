import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";


export default observer(function ActivityList() {
    
    const [target, setTarget] = useState('');

    const {activityStore} = useStore()
    const {loading} = activityStore;

    function delActivity(e:SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        activityStore.handleDeleteActivity(id);
    }

    
    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesOrderedByDate.map((activity) => (

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
                                <Button floated="right" color="blue" onClick={()=>activityStore.selectActivity(activity.id)} >View</Button>
                                <Button name={activity.id} loading={loading && target === activity.id} floated="right" color="red" onClick={(e)=>delActivity(e,activity.id)} >Delete</Button>
                                <Label basic content={activity.category}/>
                            </Item.Extra>

                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment >

    );
})