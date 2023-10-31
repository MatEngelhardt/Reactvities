import axios, { AxiosError, AxiosResponse } from "axios";
import Activity from "../../models/activity";
import { toast } from "react-toastify";
import { store } from "../stores/stores";
import { router } from "../router/Routes";


axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {

    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:

            if (config.method === "get" &&  Object.prototype.hasOwnProperty.call(data.errors, "id")) { 
                router.navigate("/not-found");
            }

            if (data.errors) {
                const popErros = [];
                for (const key in data.errors) {
                    popErros.push(data.errors[key]);
                }

                throw popErros.flat();
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("unauthorized");
            break;
        case 403:
            toast.error("forbidden");
            break;
        case 404:
            toast.error("not found");
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate("/server-error")
            break;
    }
    return Promise.reject(error);
});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url),
}

const Activities = {
    list: () => requests.get<Activity[]>(('/activities')),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post('/activities', activity),
    update: (activity: Activity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

export const Agent = {
    Activities
}