import crudProvider from "ra-data-nestjsx-crud";
import {fetchUtils} from "react-admin";

export const dataProvider = crudProvider('http://localhost:3000/api', async (url, options = {}) => {
    const token = localStorage.getItem('access_token') || undefined;
    options.user = {
        token: `Bearer ${token}`,
        authenticated: !!token
    }
    options.headers = fetchUtils.createHeadersFromOptions(options);
    const result = await fetchUtils.fetchJson(url, options);
    return result;
});