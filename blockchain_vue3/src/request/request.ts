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
export function uplink(data) {
    return axios.post('http://124.220.149.155:9090/uplink', data, {
        headers:{
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(res => {
        if (res.data.code == 200){
            localStorage.setItem('txid',res.data.txid)
            localStorage.setItem('trace_code',res.data.traceability_code)
            return 1
        }
        else{
            console.log(res.data)
            return 0
        }
    })

}

export function getdata(data) {
    return axios.post('http://124.220.149.155:9090/getFruitInfo', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            console.log('Data retrieved successfully:', res.data);
            return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
    });
}
export function getorder(data) {
    return axios.post('http://124.220.149.155:9090/getOrders', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            console.log('Data retrieved successfully:', res.data);
            localStorage.setItem('orders',JSON.stringify(res.data.data))
            return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
    });
}
export function getnumber(data) {
    return axios.post('http://124.220.149.155:9090/getNumbers', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            console.log('Data retrieved successfully:', res.data);
            localStorage.setItem('numbers',JSON.stringify(res.data.data))
            return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
    });
}

export function getalldata(data) {
    return axios.post('http://124.220.149.155:9090/getAllFruitInfo', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            
            localStorage.setItem('alldata',res.data.data)
            return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
    });
}

export function getinfo(data) {
    return axios.post('http://124.220.149.155:9090/getInfo', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            console.log('Data retrieved successfully:', res.data);
            localStorage.setItem('usertype',res.data.userType)
            localStorage.setItem('username',res.data.username)
            localStorage.setItem('userID',res.data.userID)
	    return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
    });
}
export function uporder(data) {
    return axios.post('http://124.220.149.155:9090/upOrder', data,{
        headers: {
            'Authorization': localStorage.getItem('token') // 使用存储的 token
        }
    })
    .then(res => {
        if (res.status == 200) {
            console.log('Data retrieved successfully:', res.data);
            
            return 1; // 返回获取的数据
        } else {
            console.log('Failed to retrieve data:', res.data.message);
            return 0; // 返回 null，表示未能成功获取数据
        }
    })
    .catch(error => {
        console.log('Error during data retrieval:', error);
        return 0; // 返回 null，表示发生了错误
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

