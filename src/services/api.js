import axios from "axios";

const token = process.env.REACT_APP_GITHUB_TOKEN;

if (!token) {
    console.warn("GitHub token não definido. Adicione REACT_APP_GITHUB_TOKEN no seu arquivo .env para aceitar mais requisições.");
}

const api = axios.create({
    baseURL: 'https://api.github.com/',
    headers: token
        ? { Authorization: `token ${token}` }
        : {},
});

export default api;