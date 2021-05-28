import axios from 'axios'

const api = axios.create({ baseURL: 'https://watson-teste.herokuapp.com' })

export default api