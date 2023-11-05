import { useEffect, useState } from "react";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import Activity from "../../../models/activity";
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from 'yup';
import MyTextInput from "./myTextInput";
import MyTextArea from "./myAreaInput";
import MyAreaInput from "./myAreaInput";
import MySelectInput from "./mySelectInput";
import { categories } from "./myCategories";
import MyDatepickerInput from "./myDatepickerInput";

export default observer(function ActivityForm() {

    const { activityStore } = useStore()
    const { loading, loadActivity, updateActivity, createActivity } = activityStore
    const { id } = useParams()
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date:null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category required"),
        date: Yup.string().required(),
        city: Yup.string().required()


    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity) => {
                if (activity)
                    setActivity(activity);
            });
        }

    }, [id, loadActivity]);


    function handleOnFormSubmit(activity:Activity) {

        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            });
        }
        else {
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            })
        }

    }

    return (
        <Segment clearing>
            <Formik enableReinitialize
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={handleOnFormSubmit}>
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder="Title" name="title"/>
                        <MyAreaInput placeholder="Description" name="description" row={3} />
                        <MySelectInput placeholder="Catgory" name="category" options={categories} />
                        <MyDatepickerInput 
                            placeholderText="Date" 
                            name="date" 
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d yyyy H:mm aa"/>
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
                    </Form>
                )}

            </Formik>

        </Segment>
    );
})