import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUnreadEmails = async (data) => {
    try {
        return await axios.get(`${API_URL}/unread`).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}


export const getEmailById = async (id) => {
    try {
        return await axios.get(`${API_URL}/fetch-email/${id}`).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

export const RefineAiDraft = async (data) => {
    try {
        return await axios.post(`${API_URL}/refine`, data).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

export const sendEmail = async (id, body) => {
    try {
        return await axios.post(`${API_URL}/send/${id}`, { body }).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}

