<template>
    <div class="top">
        <el-button @click="add">新增订单</el-button>
        <el-button @click="onDelete">删除订单</el-button>
    </div>
    <el-scrollbar max-height="600px">
        <div v-for="item in count" :key="item" class="scrollbar-demo-item">
            <el-descriptions title="订单号：" class="item">
                <el-descriptions-item label="客户">kooriookami</el-descriptions-item>
                <el-descriptions-item label="联系电话">18100000000</el-descriptions-item>
                <el-descriptions-item label="地址">Suzhou</el-descriptions-item>
                <el-descriptions-item label="订单状态">
                    <el-tag size="small">已完成</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="详细地址">
                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(3)

const add = () => {
    count.value++
}
const onDelete = () => {
    if (count.value > 0) {
        count.value--
    }
}
</script>

<style scoped>
.top {
    margin-bottom: 20px;
    padding: 10px;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 20px;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);

    .item {
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #cccccc;
        border-radius: 10px;

        >>> .el-descriptions__body {
            background-color: yellowgreen;
        }
    }
}
</style>