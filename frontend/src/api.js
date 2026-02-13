import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const translateText = async (text) => {
    const res = await axios.post("http://127.0.0.1:8000/api/translate/", {
        text: text,
    });
    return res.data;
};


export const saveTranslation = (data) =>
    axios.post(BASE_URL + "save/", data);

export const getHistory = () =>
    axios.get(BASE_URL + "history/");

export const deleteHistory = (id) =>
    axios.delete(BASE_URL + `delete/${id}/`);