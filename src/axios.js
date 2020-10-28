import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-71da1.firebaseio.com',
})

export default instance
