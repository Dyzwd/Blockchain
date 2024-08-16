<template>
    <div class="container">
        <img src="/src/image/bg.jpg" alt="" class="bg">
        <div class="main">
            <div class="title"> 基于区块链地农产品溯源系统</div>
            <div class="yhm-container">
                <div class="yhm-srk">
                    <img src="/src/image/icon-user.png" alt="" class="user-logo">
                    <input type="text" class="yhm-input" placeholder="请输入用户名" v-model="yhm">
                </div>
            </div>
            <div class="warm-container">
                <div class="warm" :style="yhmWarm"> username is required</div>
            </div>
            <div class="mm-container">
                <div class="mm-srk">
                    <img src="/src/image/密码.png" alt="" class="mm-img">
                    <input :type="wordShow" class="mm-input" placeholder="请输入密码" v-model="mm">
                    <div class="eye" id="eye" @click="eyeChange">
                        <img src="/src/image/眼睛_显示.png" alt="" :class="eyeClose ? 'eyes' : 'eyesActive'">
                        <img src="/src/image/眼睛_隐藏.png" alt="" :class="eyeClose ? 'eyesActive' : 'eyes'">
                    </div>
                </div>
            </div>
            <el-form-item style="width: 200px">
          <el-select placeholder="请选择角色" v-model="user">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
            <div class="warm-container">
                <div class="warm" :style="mmWarm"> password is required</div>
            </div>
            <div class="bt-container">
                <div class="zc-bt" @click="register_a">注册</div>
                <div class="dl-bt" @click="login_a">登录</div>
            </div>
        </div>
        <div class="wz"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import { useAllDataStore } from '@/store'
import { useRouter } from 'vue-router'
import { register,login } from '@/request/request.ts'
//密码小眼睛

let options = [{
        value: '种植户',
        label: '种植户'
      }, {
        value: '工厂',
        label: '工厂'
      }, {
        value: '运输司机',
        label: '运输司机'
      }, {
        value: '商店',
        label: '商店'
      }, {
        value: '消费者',
        label: '消费者'
      }]
let eyeClose = ref(1)
let wordShow = ref('password')

const router = useRouter()
async function register_a(){
    let formData = new FormData()
    formData.append('username',yhm.value)
    formData.append('password',mm.value)
    formData.append('userType',user.value)
    const result = await register(formData)
    if (result == 1)
    {
        confirm('注册成功，交易id为' + localStorage.getItem('txid'))
    }
    else
    {
        confirm('注册失败')
    }
}
function eyeChange() {
    eyeClose.value = 1 - eyeClose.value
}
watch(eyeClose, (news) => {
    if (news == 0) {
        wordShow.value = 'text'
    } else {
        wordShow.value = 'password'
    }
})

//warm事件
let warmAllow = ref(0)
let yhmWarm = reactive({
    top: "-10px",
    opacity: "0"
})

let yhm = ref('')
let mmWarm = reactive({
    top: "-10px",
    opacity: "0"
})
let mm = ref('')
let user = ref('')

async function login_a() {
    warmAllow.value = 1
    if (yhm.value == '' || mm.value == '') {
        if (yhm.value == '') {
            Object.assign(yhmWarm, {
                top: "0",
                opacity: "1"
            })
        }
        if (mm.value == '') {
            Object.assign(mmWarm, {
                top: "0",
                opacity: "1"
            })
        }
    } else {
        let formData = new FormData()
        formData.append('username',yhm.value)
        formData.append('password',mm.value)
        const result = await login(formData)
        if (result == 1) {
            router.push({ path: '/home/chart' })
            localStorage.setItem('username',yhm.value)
            confirm("登陆成功")
        }else{
            confirm("账号密码错误")
        }
    }
}

watch(user,(news) => {
    console.log('Selected user:', news);
}

)
watch(yhm, (news) => {
    if (news == '' && warmAllow.value == 1) {
        console.log('warm')
        Object.assign(yhmWarm, {
            top: "0",
            opacity: "1"
        })
    } else {
        Object.assign(yhmWarm, {
            top: "-10px",
            opacity: "0"
        })
    }
})

watch(mm, (news) => {
    if (news == '' && warmAllow.value == 1) {
        console.log('warm')
        Object.assign(mmWarm, {
            top: "0",
            opacity: "1"
        })
    } else {
        Object.assign(mmWarm, {
            top: "-10px",
            opacity: "0"
        })
    }
})


</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    .bg {
        filter: blur(6px);
        position: absolute;
        object-fit: cover;
        justify-content: center;
    }

    .main {
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1;

        .title {
            font-size: 30px;
            color: #545454;
            margin-bottom: 20px;
        }
    }
}




.yhm-container {
    width: 448.4px;
    height: 52px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    background-color: rgb(255, 255, 255, .3);
    border-radius: 6px;
    position: relative;
    transition: .3s;
}

.yhm-container:hover {
    filter: brightness(1.1);
}

.yhm-srk {
    width: 100%;
    height: 100%;
    padding-left: 5px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
}

.yhm-input {
    width: 100%;
    height: 100%;
    outline-style: none;
    border: 0 none;
    background: transparent;
    font-size: 18px;
}

.mm-container {
    width: 448.4px;
    height: 52px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(255, 255, 255, .3);
    border-radius: 6px;
    margin-top: 20px;
    transition: .3s;
}

.mm-container:hover {
    filter: brightness(1.1);
}

.mm-srk {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    transition: .3s;
    padding-left: 5px;
    padding-right: 5px;
}

.mm-input {
    width: 100%;
    height: 100%;
    outline-style: none;
    border: 0 none;
    background: transparent;
    font-size: 18px;
}

.bt-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
}

.bt-container div {
    background: #409eff;
    width: 135px;
    height: 39.6px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;
    transition: .3s;
}

.bt-container div:first-child {
    background: #909399;
}

.bt-container div:hover {
    filter: brightness(1.1);
}

input[type="password"]::-ms-reveal {
    display: none
}

.warm-container {
    width: 448.4px;
    height: 16px;
    margin-top: 5px;
    position: relative;
}


.warm {
    color: #f56c6c;
    font-size: 13px;
    transition: .3s;
    position: absolute;
}

.user-logo {
    width: 30px;
    height: 30px;
    margin-left: 8px;
    margin-right: 2px;
}

.mm-img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 2px;
}

.eyes {
    display: none;
}

.eyesActive {
    display: block;
    width: 30px;
    height: 30px;
    margin-right: 8px;
}
</style>
