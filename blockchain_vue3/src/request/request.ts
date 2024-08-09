import axios from 'axios'

export function register(data) {
    axios.post('http://124.220.149.155:9090/register',data,{
        timeout:5000
    }).then(res => {console.log(res.txid)})
    .catch(error => {console.log('Error during POST request:',error)})
}
