<template>
    <div class="container">
        <el-form style="max-width: 600px" :model="sizeForm" label-width="auto" :label-position="labelPosition"
            :size="size">
            <el-form-item label="菜品">
                <el-input v-model="sizeForm.crop" />
            </el-form-item>
            <el-form-item label="重量">
                <el-input v-model="sizeForm.weight" />
            </el-form-item>
            <el-form-item label="源产地">
                <el-input v-model="sizeForm.source" />
            </el-form-item>
            <el-form-item label="采摘时间">
                <el-col :span="11">
                    <el-date-picker v-model="sizeForm.time" type="date" aria-label="Pick a date" placeholder="请输入日期"
                        style="width: 100%" format="YYYY/M/D" value-format="YYYY.M.D" />
                </el-col>
            </el-form-item>
            <el-radio-group v-model="sizeForm.isTrade" class="radio">
                <el-radio :value="true"  size="large" border>已完成</el-radio>
                <el-radio :value="false"  size="large" border>未完成</el-radio>
            </el-radio-group>
            <el-form-item>
                <el-button type="primary" @click="add">确认</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
//附件区
import { onMounted, ref } from 'vue'
import type { ComponentSize, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('top')

//工作区
const sizeForm = ref({
    id: "",
    crop: "",
    source: "",
    time: "",
    weight: "",
    isTrade:null,
})

//listTable数据
import listTable from '@/data/lsitTable'

//增加数据
const add = () => {
    listTable.cropData.value.push({
        ...sizeForm.value,
        id: (listTable.cropData.value.length + 1).toString()
    })
    ElMessage({
        message: '创建记录成功',
        type: 'success',
    })
}


onMounted(() => {

})
</script>

<style>
.container {
    padding: 20px;
}

.el-radio-group {
    margin-right: 12px;
}

.radio{
    margin: 10px 0 20px 0;
}

</style>
