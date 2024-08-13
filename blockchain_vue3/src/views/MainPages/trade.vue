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
        <el-form :model="form">
            <el-form-item label="菜品" :label-width="formLabelWidth">
                <el-input v-model="form.crop" autocomplete="off" />
            </el-form-item>
            <el-form-item label="重量" :label-width="formLabelWidth">
                <el-input v-model="form.weight" autocomplete="off" />
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item> -->
            <el-form-item label="交易状态" :label-width="formLabelWidth">
                <el-input v-model="form.isTrade" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                    应用
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
let tradeData = ref([{}])

//tradeData数据
import tradeTable from '@/data/tradeTable';

//生命周期
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
