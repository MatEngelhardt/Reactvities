import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import Activity from "../../../models/activity";
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {

    const {activityStore } = useStore()
    const {loading, loadActivity,updateActivity,createActivity} = activityStore
    const {id} = useParams()
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(()=>{
        if(id)
        {
            loadActivity(id).then((activity)=>{
                if(activity)
                    setActivity(activity);
            });
        }
    },[id, loadActivity]);

    function handleOnSubmit() {

        if(!activity.id)
        {
            activity.id = uuid();
            createActivity(activity).then(()=>{
                navigate(`/activities/${activity.id}`);
            });
        }
        else{
            updateActivity(activity).then(()=>{
                navigate(`/activities/${activity.id}`);
            })
        }
        
    }

    function handleOnChanged(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleOnSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" name="title" value={activity?.title} onChange={handleOnChanged} />
                <Form.TextArea placeholder="Description" name="description" value={activity?.description} onChange={handleOnChanged} />
                <Form.Input placeholder="Catgory" name="category" value={activity?.category} onChange={handleOnChanged} />
                <Form.Input type="Date" placeholder="Date" name="date" value={activity?.date} onChange={handleOnChanged} />
                <Form.Input placeholder="City" name="city" value={activity?.city} onChange={handleOnChanged} />
                <Form.Input placeholder="Venue" name="venue" value={activity?.venue} onChange={handleOnChanged} />
                <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
                <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
})