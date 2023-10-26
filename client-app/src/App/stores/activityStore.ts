import { makeAutoObservable, runInAction } from "mobx"
import Activity from "../../models/activity"
import { Agent } from "../api/agent"
import { v4 as uuid } from 'uuid';

export default class ActivityStore {

    loading: boolean = false;
    editMode: boolean = false;
    loadingInitial: boolean = true;
    activityRegistry: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity?: Activity  = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesOrderedByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
    }


    loadActivities = async () => {
        try {
            const activities = await Agent.Activities.list();

            runInAction(()=>{
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activityRegistry.set(activity.id, activity);
                })
            });

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await Agent.Activities.update(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.selectedActivity = activity;
                this.loading = false;
            });

        }
        catch (error) {
            console.log(error);

            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createActivity = async (activity: Activity) => {

        this.loading = true;

        try {
            activity.id = uuid();
            await Agent.Activities.create(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
                this.editMode = false;
            });
        }
        catch (error) {
            console.log(error);

            runInAction(() => {
                this.loading = false;
            });
        }
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    formOpen(id?: string) {
        id ? this.selectActivity(id) : this.handleCancelSelectActivity();
        this.editMode = true;
    }

    formClose() {
        this.editMode = false;
    }


    handleCancelSelectActivity() {
        this.selectedActivity = undefined;
    }

    async handleDeleteActivity(id: string) {
        this.loading = true;

        await Agent.Activities.delete(id).then(() => {
            this.activityRegistry.delete(id);
            if (id === this.selectedActivity?.id) this.handleCancelSelectActivity();
            this.loading = false;
        });
    }

    setEditMode(value: boolean) {
        this.editMode = value
    }
}
