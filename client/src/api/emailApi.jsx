import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);

        // Redirect to home page on any error
        window.location.href = "/";

        return Promise.reject(error);
    }
);


export const fetchUnreadEmails = async (data) => {
    try {
        return await api.get(`${API_URL}/unread`).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}


export const getEmailById = async (id) => {
    try {
        return await api.get(`${API_URL}/fetch-email/${id}`).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

export const RefineAiDraft = async (data) => {
    try {
        return await api.post(`${API_URL}/refine`, data).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

export const sendEmail = async (id, body) => {
    try {
        return await api.post(`${API_URL}/send/${id}`, { body }).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

