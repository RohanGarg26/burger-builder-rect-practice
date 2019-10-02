import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-builder-a9048.firebaseio.com/'
})

export default instance