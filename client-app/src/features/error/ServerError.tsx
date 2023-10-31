import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/stores"
import { observer } from "mobx-react-lite";

export default observer(function ServerError() {
    const { commonStore } = useStore();
    const { error } = commonStore;

    return (
        <Container>
            <Header as="h1" content="Server Error" />
            <Header sub as="h5" color="red" content={error?.message} />
            {error?.details && (

                <Segment>
                    <Header as="h4" color="teal" content="Stack-Trace" />
                    <code style={{ marginTop: '10px' }}>{error?.details}</code>
                </Segment>
            )}
        </Container>
    )
})