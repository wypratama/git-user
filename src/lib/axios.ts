import axios from "axios";
import { API_URL } from "~/config";

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
	},
});

// instance.interceptors.response.use((response) => response.data);

export default instance;
