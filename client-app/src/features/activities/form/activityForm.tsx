import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";


export default observer(function ActivityForm() {

    const {activityStore } = useStore()
    const { selectedActivity, loading} = activityStore

    const initialActivity = selectedActivity ?? {
            id: '',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        };

    const [activity, setActivity] = useState(initialActivity);

    function handleOnSubmit() {
        activity.id ? activityStore.updateActivity(activity) : activityStore.createActivity(activity);
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
                <Button floated="right" onClick={()=>activityStore.formClose()} type="button" content="Cancel" />
            </Form>
        </Segment>
    );
})