
import {useField } from "formik";
import { Form, Label, Select, TextArea } from "semantic-ui-react";

export interface Props {
    placeholder: string,
    name: string,
    options: {text:string, value:string}[],
    label?: string
}

export default function MySelectInput(props: Props) {
    const [field, meta, helper] = useField(props.name);
    
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                clearable 
                placeholder={props.placeholder}
                options={props.options}
                value={field.value}
                onChange={(_,e)=>{ console.log(e); helper.setValue(e.value);}}
                onBlur={()=> helper.setTouched(true)}/>
            {meta.touched && meta.error? (<Label basic color="red">{meta.error}</Label>) : null }
        </Form.Field>
    )
}