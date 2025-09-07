import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000", 
})

export const getNotes = () => API.get( "/notes");
export const createNote = (text) => API.post("/notes", { text});