import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `${process.env.VUE_APP_URL_SERVER}/api/`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }   
    })
}