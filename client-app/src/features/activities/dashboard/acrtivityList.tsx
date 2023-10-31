import { Fragment} from "react";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/stores";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./activityListItem";


export default observer(function ActivityList() {


    const { activityStore } = useStore()
    const { groupedActivites } = activityStore

    return (

        <>
            {groupedActivites.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>

                    {activities.map(activity =>
                        <ActivityListItem key={activity.id} activity={activity} />
                    )}
                </Fragment>
            ))}
        </>

    );
});
