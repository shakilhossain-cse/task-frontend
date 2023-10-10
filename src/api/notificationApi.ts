import { HttpClient } from "../utils/axios";

const getNotification = async() => {
    const response = await HttpClient.get(`/notifications`);
    return response.data;
}

export {getNotification}