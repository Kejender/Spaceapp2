import axios from 'axios'

const getHW = (hw) => {
  console.log("gethw")

  // change the get function for local / deployment
  //return axios.get('http://localhost:3001/api/hwinfo')
  return axios.get('/api/hwinfo')
}

export default { 
  getHW: getHW, 
}