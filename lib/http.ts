import axios from "axios";

export const api = axios.create({
  baseURL: "https://legisjet.com.br/simples-calc/api/index.php/",
  headers: {
    "Content-Type": "application/json",
  },
});
