import {AuthProvider, HttpError, PreviousLocationStorageKey} from 'react-admin';
import {AxiosInstance} from "axios";
import {traderBotApi} from "../clients/traderBotApi";

const buildAuthProvider = (
    client: AxiosInstance,
): AuthProvider => ({
    async login(params) {
        const {username, password} = params;
        const {data} = await client.post('/auth/login', {
            login: username,
            password
        })
        localStorage.setItem('access_token', data.access_token);
    },
    // called when the user clicks on the logout button
    async logout() {
        localStorage.removeItem('access_token')
    },
    // called when the API returns an error
    async checkError({ status }) {
        if (status === 401 || status === 403) {
            throw new Error('Unauthorized');
        }
    },
    // called when the user navigates to a new location, to check for authentication
    async checkAuth() {
        const { data } = await client.post('/auth/me');
        return data;
    },
    async getIdentity() {
        const { data } = await client.post('/auth/me');
        return data;
    },
    async getPermissions() {}
});

export const authProvider = buildAuthProvider(traderBotApi);