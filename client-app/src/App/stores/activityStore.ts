import { makeAutoObservable, runInAction } from "mobx"
import Activity from "../../models/activity"
import { Agent } from "../api/agent"
import { v4 as uuid } from 'uuid';
import {format} from 'date-fns';

export default class ActivityStore {

    loading: boolean = false;
    editMode: boolean = false;
    loadingInitial: boolean = true;
    activityRegistry: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity?: Activity = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesOrderedByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return a.date!.getTime() - b.date!.getTime();
        });
    }

    get groupedActivites() {
        return Object.entries(
            this.activitiesOrderedByDate.reduce((activities, activity) => {
                const date = format(activity.date!,"dd MMM yyyy");
                activities[date!] = activities[date!] ? [...activities[date!], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] }));
    }

    loadActivities = async () => {

        this.setLoadingInitial(true);

        try {
            const activities = await Agent.Activities.list();

            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                })
            });

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }


    loadActivity = async (id: string) => {
        var activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;
        }
        else {
            this.setLoadingInitial(true);
            try {

                activity = await Agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(() => {
                    this.selectedActivity = activity;
                });

                this.setLoadingInitial(false);

            }
            catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

        return activity;
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


    async deleteActivity(id: string) {
        this.loading = true;

        try {
            await Agent.Activities.delete(id);

            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error)

            runInAction(() => {
                this.loading = true;
            })
        }


    }

    setEditMode(value: boolean) {
        this.editMode = value
    }
}
