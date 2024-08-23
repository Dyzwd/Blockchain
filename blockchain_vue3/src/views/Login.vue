<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//用于注册的数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: '',
    role: ''
})

//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请再次输入密码"))
    } else if (value != registerData.value.password) {
        callback(new Error("两次输入的密码不一致"))
    } else {
        callback()
    }
}
//用于注册的表单校验模型
const registerDataRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '用户名的长度必须为5~16位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
    ],
    rePassword: [
        { validator: rePasswordValid, trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
})

//选择器
const value = ref('')
const options = [
    {
        value: '种植户',
        label: '种植户',
    },
    {
        value: '物流',
        label: '物流',

    },
    {
        value: '工厂',
        label: '工厂',

    },
    {
        value: '店铺',
        label: '店铺',

    },
    {
        value: '管理员',
        label: '管理员',
        disabled: true,
    }
]

//注册
import { register,login } from '@/request/request.ts'
import { ElMessage } from 'element-plus'
const handleRegister = async () => {
    let formData = new FormData()
    formData.append('username', registerData.value.username)
    formData.append('password', registerData.value.password)
    formData.append('role', registerData.value.role)
    let result = await register(formData)
    if (result == 1) {
        confirm('注册成功，交易id为' + localStorage.getItem('txid'))
        ElMessage.success('注册成功')
    }
    else {
        /* confirm('注册失败') */
        ElMessage.error('注册失败')
    }
    isRegister.value = false
    clearInput();
}

//清空函数
const clearInput = () => {
    registerData.value.username = ''
    registerData.value.password = ''
    registerData.value.rePassword = ''
    registerData.value.role = ''
}

//登录-参数校验-同注册

//登录
import { useRouter } from 'vue-router'
const router = useRouter() 
const handleLogin = async() => {
    let formData = new FormData()
    formData.append('username', registerData.value.username)
    formData.append('password', registerData.value.password)
    let result = await login(formData)
    if (result == 1) {
        router.push({ path: '/home/chart' })
        localStorage.setItem('username', registerData.value.username)
        ElMessage.success("登录成功")
    } else {
        ElMessage.error("账号密码错误")
    }
}
</script>



<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <h1 class="top-title">杭州市农产品朔源系统</h1>
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData"
                :rules="registerDataRules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- @选择器 -->
                <el-from-item prop="role">
                    <el-select v-model="registerData.role" placeholder="请选择您的角色" style="margin-bottom: 20px;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled" />
                    </el-select>
                </el-from-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="handleRegister">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearInput()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="registerDataRules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="handleLogin">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearInput()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/bg.png') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}

.top-title{
    width: 100%;
    text-align: center;
    font-weight: 800;
    font-size: 22px;
    margin-bottom: 20px;
}
</style>
