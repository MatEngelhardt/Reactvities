import { Message } from "semantic-ui-react"

interface Props {
    errors: string[]
}

export default function ValidationError({ errors }: Props) {
    return (
        <Message error>
            {errors && 
                errors.map((err: string, key: number) => (
                    <Message.Item key={key}>{err}</Message.Item>
                ))}
        </Message>
    )
}