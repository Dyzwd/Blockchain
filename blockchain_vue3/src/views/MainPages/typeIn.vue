<template>
    <div class="container">

        <!-- <div>
            <el-radio-group v-model="size" aria-label="size control">
                <el-radio-button value="large">large</el-radio-button>
                <el-radio-button value="default">default</el-radio-button>
                <el-radio-button value="small">small</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="labelPosition" aria-label="position control">
                <el-radio-button value="left">Left</el-radio-button>
                <el-radio-button value="right">Right</el-radio-button>
                <el-radio-button value="top">Top</el-radio-button>
            </el-radio-group>
        </div> -->
        <br />
        <el-form style="max-width: 600px" :model="sizeForm" label-width="auto" :label-position="labelPosition" :size="size">
            <el-form-item label="用户">
                <el-input v-model="sizeForm.name" />
            </el-form-item>
            <el-form-item label="菜品">
                <el-input />
            </el-form-item>
            <el-form-item label="地区">
                <el-select v-model="sizeForm.region" placeholder="请选择地区">
                    <el-option label="西湖区" value="shanghai" />
                    <el-option label="拱墅区" value="beijing" />
                    <el-option label="滨江区" value="shanghai" />
                    <el-option label="临平区" value="beijing" />
                    <el-option label="柯桥区" value="shanghai" />
                    <el-option label="余杭区" value="beijing" />
                    <el-option label="萧山区" value="shanghai" />
                    <el-option label="钱塘区" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="采摘时间">
                <el-col :span="11">
                    <el-date-picker v-model="sizeForm.date1" type="date" aria-label="Pick a date" placeholder="请输入日期"
                        style="width: 100%" />
                </el-col>
                <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                <el-col :span="11">
                    <el-time-picker v-model="sizeForm.date2" aria-label="Pick a time" placeholder="请输入具体时间"
                        style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="物流">
                <el-checkbox-group v-model="sizeForm.type">
                    <el-checkbox-button value="Online activities" name="type">
                        快递速运
                    </el-checkbox-button>
                    <el-checkbox-button value="Promotion activities" name="type">
                        送货上门
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="sizeForm.resource">
                    <el-radio border value="Sponsor">待售</el-radio>
                    <el-radio border value="Venue">缺货</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormProps } from 'element-plus'

const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('top')

const sizeForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

function onSubmit() {
    console.log('submit!')
}
</script>

<style>
.container{
    padding: 20px;
}

.el-radio-group {
    margin-right: 12px;
}
</style>