<template>
    <div class="container">
        <div class="user-container">
            <el-card shadow="hover">
                <div class="user">
                    <div class="user-left">
                        <el-avatar shape="square" :size="80"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    </div>
                    <div class="user-right">
                        <el-descriptions :title="sizeForm.name">
                            <!--el-descriptions-item label="年龄：">35</el-descriptions-item>
                            <el-descriptions-item label="电话：">181000000</el-descriptions-item-->
                            
                            <el-descriptions-item label="身份：">
                                <el-tag size="small">{{sizeForm.role}}</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="用户ID">{{sizeForm.id}}</el-descriptions-item>
                        </el-descriptions>
                    </div>
                    <div style="margin-left: 350px">
                        <el-button @click="openDialog()">发布订单</el-button>
                        <!--el-button @click="getData()">获取数据</el-button-->
                    </div>
                </div>
            </el-card>
        </div>
        <div class="trade-container">
            <div class="trade-item-container" v-for="order in tradeData">
                <el-card shadow="hover">
                    <div class="trade-item">
                        <el-descriptions :title="order.type">
                            <el-descriptions-item label="订单价格:">{{ order.total_price }}</el-descriptions-item>

                            <el-descriptions-item label="联系方式">{{ order.number }}</el-descriptions-item>
                            
                            <el-descriptions-item label="状态">
                                <el-tag size="small">{{order.status}}</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="内容">
                                {{order.content}}
                            </el-descriptions-item>

                        </el-descriptions>
                        <el-button type="success" size="small" plain @click="handleEdit(scope.row)" style="margin-left: 350px;">
                            接受订单
                        </el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="" width="500" center>
        <el-form>
            <el-form-item label="订单总价">
                <el-input v-model="sizeForm.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="订单类型" >
                <el-input  v-model="sizeForm.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="联系方式" >
                <el-input  v-model="sizeForm.contact" autocomplete="off" />
            </el-form-item>
            <el-form-item label="订单内容" >
                <el-input  v-model="sizeForm.content" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item> -->
            <el-form-item label="交易状态" >
                <el-input  v-model="sizeForm.status" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="upload" type="primary">
                    应用
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {ref,onMounted,reactive} from 'vue'
import { uporder,getorder } from '@/request/request.ts'
import { ElMessage } from 'element-plus'
let tradeData = ref([{}])
let dialogFormVisible = ref(false)
//tradeData数据
import tradeTable from '@/data/tradeTable';
function openDialog(){
    dialogFormVisible.value = true
}
//生命周期
const sizeForm = reactive({
    price:"",
    type:"",
    status:"",
    content:"",
    contact:"",
    name:localStorage.getItem('username'),
    role:localStorage.getItem('usertype'),
    id:localStorage.getItem('userID'),

})
function getData(){
    getorder()
}
async function upload(){
    console.log(sizeForm)
    let formData = new FormData()
    formData.append('number',sizeForm.contact)
    formData.append('price',sizeForm.price)
    formData.append('type',sizeForm.type)
    formData.append('status',sizeForm.status)
    formData.append('content',sizeForm.content)
    const result = await uporder(formData)
    if (result == 1){
        ElMessage({
        message: '发布成功',
        type: 'success',
    })
    }else{
        ElMessage({
        message: '发布失败',
        type: 'error',
    })
    }
}
onMounted(() => {
    getorder()
    tradeData.value = JSON.parse(localStorage.getItem('orders'))
    console.log(tradeData)
    
})
</script>

<style scoped lang="less">
.container {

    .user-container {

        .user {
            display: flex;
            align-items: center;

            .user-left {
                height: 100%;
                padding-right: 20px;
                border-right: 1px solid #ccc;
            }

            .user-right {
                margin-left: 20px;
            }
        }
    }

    .trade-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin-top: 20px;
        border-radius: 20px;
    }
}
</style>
