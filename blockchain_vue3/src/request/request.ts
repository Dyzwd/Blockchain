import axios from 'axios'

export function register(data) {
    return axios.post('http://124.220.149.155:9090/register',data,{
        timeout:5000
    }).then(res => {localStorage.setItem('txid',res.data.txid)
    return 1
})
    .catch(error => {console.log('Error during POST request:',error)})
}

export function login(data) {  
    return axios.post('http://124.220.149.155:9090/login', data, {  
        timeout: 5000  
    })  
    .then(res => {  
        if (res.data.jwt != undefined) { // 假设服务器返回一个 success 字段，用于判定状态  
            console.log('Login successful, token:', res.data.jwt);   
            localStorage.setItem('token', res.data.jwt);  
            return 1
        } else {  
            console.log('Login failed:', res.data.message); // 提示具体失败信息  
        }  
    })  
    .catch(error => {  
        console.log('Error during login request:', error);  
    });  
}  

//function saveTokenToServer(token) {  
    // 假设有一个 API 用于保存 token  
 //   axios.post('http://124.220.149.155:9090/save-token', { token }, {  
 //       timeout: 5000  
  //  })  
  //  .then(res => {  
 //       console.log('Token saved to server:', res.data);  
 //   })  
  //  .catch(error => {  
  //      console.log('Error saving token to server:', error);  
  //  });  
//}  

