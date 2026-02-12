import axios from "axios";

export const translateText = async (text) => {
    const res = await axios.post("http://127.0.0.1:8000/api/translate/", {
        text: text,
    });
    return res.data;
};
