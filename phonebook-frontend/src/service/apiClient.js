import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../utils/config'

const apiClient = axios.create({
  baseURL: REACT_APP_BACKEND_URL
})

console.log('backend url', REACT_APP_BACKEND_URL)
export default apiClient