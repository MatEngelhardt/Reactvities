
import {useField } from "formik";
import { Form, Label, TextArea } from "semantic-ui-react";

export interface Props {
    placeholder: string,
    name: string,
    row: number,
    label?: string
}

export default function MyAreaInput(props: Props) {
    const [field, meta] = useField(props.name);
    
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <TextArea {...field}{...props}/>
            {meta.touched && meta.error? (<Label basic color="red">{meta.error}</Label>) : null }
        </Form.Field>
    )
}