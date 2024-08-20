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
                        <el-descriptions title="admin">
                            <el-descriptions-item label="年龄：">35</el-descriptions-item>
                            <el-descriptions-item label="电话：">181000000</el-descriptions-item>
                            <el-descriptions-item label="邮箱：">123456789@qq.com</el-descriptions-item>
                            <el-descriptions-item label="身份：">
                                <el-tag size="small">种植户</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="地址">
                                滨江区中信大道130号
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                    <div>
                        <el-button @click="openDialog()">上传</el-button>
                        <el-button @click="getData()">获取数据</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="trade-container">
            <div class="trade-item-container" v-for="item in tradeData">
                <el-card shadow="hover">
                    <div class="trade-item">
                        <el-descriptions title="User Info">
                            <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
                            <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                            <el-descriptions-item label="Remarks">
                                <el-tag size="small">School</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="Address">
                                No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                            </el-descriptions-item>
                        </el-descriptions>
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
    content:""

})
function getData(){
    getorder()
}
async function upload(){
    console.log(sizeForm)
    let formData = new FormData()
    formData.append('username',localStorage.getItem('userID'))
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
    
    tradeData.value = tradeTable.tradeData.value
    
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
