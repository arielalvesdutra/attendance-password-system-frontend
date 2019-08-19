import axios from 'axios'
import { backendUrl } from './backend'

const instance = axios.create({
  baseURL: backendUrl
})

export default instance
