import axios from 'axios'
import {getItem} from '@/helpers/LocalStorageHelper.js'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'
//axios.defaults.baseURL = 'http://0.0.0.0:3000/api'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const accessToken = token ? `Token ${token}` : ''
  config.headers.Authorization = accessToken
  return config
})

export default axios
