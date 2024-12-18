import { API_BASE_URL } from '../environment';
import axios from 'axios';

const network = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
});

export default network;
