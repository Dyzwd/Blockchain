<template>
    <div class="container">
        <el-form style="max-width: 600px" :model="sizeForm" label-width="auto" :label-position="labelPosition"
            :size="size">
        <el-form-item :label="`当前角色：${ usertype }`"></el-form-item>
           <el-form-item label="溯源码" v-show="farmer()">
            <el-input v-model="sizeForm.trace" />
           </el-form-item>
        <el-form-item :label="label_text('1')">
                
                <el-input v-model="sizeForm.crop" />
            </el-form-item>
            <el-form-item :label="label_text('2')">
                <el-input v-model="sizeForm.source" />
            </el-form-item>
            <el-form-item :label="label_text('3')">
                <el-input v-model="sizeForm.time" />
            </el-form-item>
            <el-form-item :label="label_text('4')" v-show="false">
                <el-col :span="11">
                    <el-date-picker v-model="sizeForm.time" type="date" aria-label="Pick a date" placeholder="请输入日期"
                        style="width: 100%" format="YYYY/M/D" value-format="YYYY.M.D" />
                </el-col>
            </el-form-item>
            <el-form-item :label="label_text('4')">
                <el-input v-model='sizeForm.weight'/>
            </el-form-item>
            <el-form-item :label="label_text('5')" v-show="!farmer()">
                <el-input v-model='sizeForm.id' :readonly="isreadonly"/>
            </el-form-item>
            <el-form-item :label="label_text('5')" v-show="farmer()">
                <el-input v-model='sizeForm.last' />
            </el-form-item>
            <el-radio-group v-model="sizeForm.isTrade" class="radio" v-show=false>
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
import { onMounted, ref ,reactive} from 'vue'
import type { ComponentSize, FormProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import {uplink} from '@/request/request.ts'
const size = ref<ComponentSize>('large')
const labelPosition = ref<FormProps['labelPosition']>('top')
const usertype = localStorage.getItem('usertype')
let isreadonly = false;
function farmer(){
    switch (usertype){
        case '种植户':
            isreadonly = true;
            return false;
        default:
            return true;
    }
}
function label_text(number) {
  switch (number) {
    case '1':
      switch (usertype) { // 确保usertype已在函数外部定义
        case '种植户':
          return '农作物名称';
        case '工厂':
          return '商品名称';
        case '运输司机':
          return '姓名';
        case '商店':
          return '入库时间';
        default:
          return '默认标签';
      }
      break; // 这个break是可选的，因为switch语句的末尾没有其他代码
      case '2':
      switch (usertype) { // 确保usertype已在函数外部定义
        case '种植户':
          return '原产地';
        case '工厂':
          return '生产批次';
        case '运输司机':
          return '年龄';
        case '商店':
          return '销售时间';
        default:
          return '默认标签';
      }
      break;
      case '3':
      switch (usertype) { // 确保usertype已在函数外部定义
        case '种植户':
          return '种植时间';
        case '工厂':
          return '生产时间';
        case '运输司机':
          return '联系电话';
        case '商店':
          return '商店名称';
        default:
          return '默认标签';
      }
      break;
      case '4':
      switch (usertype) { // 确保usertype已在函数外部定义
        case '种植户':
          return '重量';
        case '工厂':
          return '工厂名称';
        case '运输司机':
          return '车牌号';
        case '商店':
          return '商店地址';
        default:
          return '默认标签';
      }
      break;
      case '5':
      switch (usertype) { // 确保usertype已在函数外部定义
        case '种植户':
          return '用户名';
        case '工厂':
          return '联系电话';
        case '运输司机':
          return '地点转移';
        case '商店':
          return '商店电话';
        default:
          return '默认标签';
      }
      break;
    default:
      return '未定义的标签';
  }
}
//工作区
const sizeForm = reactive({
    id: localStorage.getItem('username'),
    crop: "",
    source: "",
    time: "",
    weight: "",
    trace:"",
    last:"",
    isTrade:null,
})

//listTable数据
import listTable from '@/data/lsitTable'

//增加数据

async function add() {
    let formData = new FormData()
    if (farmer() == true)
    {
        formData.append('traceability_code',sizeForm.trace)
    }
    formData.append('arg1',sizeForm.crop)
    formData.append('arg2',sizeForm.source)
    formData.append('arg3',sizeForm.time)
    formData.append('arg4',sizeForm.weight)
    formData.append('arg5',sizeForm.id)
    console.log(sizeForm.crop)
    const result = await uplink(formData)
    if (result == 1){
        ElMessage({
        message: '上链成功，txid为' + localStorage.getItem('txid') + '溯源码为' + localStorage.getItem('trace_code'),
        type: 'success',
    })
    }else{
        ElMessage({
        message: '上链失败',
        type: 'error',
    })
    }
}

onMounted(() => {
   farmer()
    
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
