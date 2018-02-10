import * as axios from 'axios';

export async function getProperties() {
    const response = await axios.get('/api/properties');
    return response.data;
}
