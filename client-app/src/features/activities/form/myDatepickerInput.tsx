
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

export interface Props {
    placeholder: string,
    name: string,
    label?: string
}

export default function MyDatepickerInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helper] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker {...props} {...field}
                selected={field.value && new Date(field.value) || null}
                onChange={(value) => helper.setValue(value)} />
            {meta.touched && meta.error ? (<Label basic color="red">{meta.error}</Label>) : null}
        </Form.Field>
    )
}