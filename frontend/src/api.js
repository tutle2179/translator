import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const translateText = async (text, targetLang) => {
    const res = await axios.post(BASE_URL + "translate/", {
        text: text,
        target_lang: targetLang,
    });
    return res.data;
};

export const saveTranslation = (data) =>
    axios.post(BASE_URL + "save/", data);

export const getHistory = () =>
    axios.get(BASE_URL + "history/");

export const deleteHistory = (id) =>
    axios.delete(BASE_URL + `delete/${id}/`);