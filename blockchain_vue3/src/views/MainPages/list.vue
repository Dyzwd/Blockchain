<template>
    <div class="container">
        <div class="top">
            <div class="left">
                <el-button type="primary" @click="menuChange('/home/typein')">新增
                    <Edit style="width: 1em; height: 1em; margin-left: 8px;" />
                </el-button>
            </div>
            <div class="right">
                <div class="search">
                    <el-input v-model="input" style="width: 240px" placeholder="请输入要查询的内容" clearable />
                    <el-button :icon="Search" type="primary" circle @click="onSearch" />
                </div>
                <div class="select">
                    <el-dropdown>
                        <el-button type="primary">
                            排序<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>按时间</el-dropdown-item>
                                <el-dropdown-item>按地区</el-dropdown-item>
                                <el-dropdown-item>按人数</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="form">
            <el-table :data="cropData" style="width: 100%">
                <el-table-column prop="farmer_input.fa_plantTime" label="日期" width="150" sortable />
                <el-table-column prop="farmer_input.fa_fruitName" label="菜品" width="150" />
                <el-table-column prop="farmer_input.fa_pickingTime" label="重量(kg)" width="150" />
                <el-table-column prop="farmer_input.fa_origin" label="源产地" min-width="200" />
                <el-table-column prop="traceability_code" label="溯源码" min-width="200" />
                
                <el-table-column label="管理" min-width="120">
                    <template #default="scope">
                        <el-button type="success" size="small" plain @click="handleEdit(scope.row)">
                            详细信息
                        </el-button>
                        <!--el-button type="default" size="small" plain @click="handleDel(scope.row)">删除</el-button-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <el-pagination size="default" background layout="prev, pager, next" :total="total" class="mt-4" @current-change="handleCurrentChange"/>
        </div>

    </div>
    <!-- dialog1 -->
    <el-dialog v-model="dialogFormVisible" title="编辑" width="500" center>
        <el-form :model="form">
            <el-form-item  label="工厂信息"></el-form-item>
            <el-form-item  >产品名称：{{datalabel.factory_input.fac_productName}}&nbsp&nbsp&nbsp&nbsp生产批次：{{datalabel.factory_input.fac_productionbatch}}&nbsp&nbsp&nbsp&nbsp生产时间：{{datalabel.factory_input.fac_productionTime}}&nbsp&nbsp&nbsp&nbsp工厂名称：{{datalabel.factory_input.fac_factoryName}}&nbsp&nbsp&nbsp&nbsp联系电话：{{datalabel.factory_input.fac_contactNumber}}</el-form-item>
            <el-form-item label="司机信息"></el-form-item>
        <el-form-item>司机姓名：{{datalabel.driver_input.dr_name}}&nbsp&nbsp&nbsp&nbsp司机年龄：{{datalabel.driver_input.dr_age}}&nbsp&nbsp&nbsp&nbsp司机电话：{{datalabel.driver_input.dr_phone}}&nbsp&nbsp&nbsp&nbsp
  车辆车牌号：{{datalabel.driver_input.dr_carNumber}}&nbsp&nbsp&nbsp&nbsp
  运输方式：{{datalabel.driver_input.dr_transport}}&nbsp&nbsp&nbsp&nbsp</el-form-item>
<el-form-item label="商品信息"></el-form-item>
<el-form-item>
  上架时间：{{datalabel.shop_input.sh_storeTime}}&nbsp&nbsp&nbsp&nbsp
  销售时间：{{datalabel.shop_input.sh_sellTime}}&nbsp&nbsp&nbsp&nbsp
  商店名称：{{datalabel.shop_input.sh_shopName}}&nbsp&nbsp&nbsp&nbsp
  商店地址：{{datalabel.shop_input.sh_shopAddress}}&nbsp&nbsp&nbsp&nbsp
  联系电话：{{datalabel.shop_input.sh_shopPhone}}&nbsp&nbsp&nbsp&nbsp
  
</el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                    区块链浏览器
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//附件区（一般不改）
import { ref, onMounted, watch,reactive,nextTick } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {
    Edit,
    Search,
} from '@element-plus/icons-vue'
import { getalldata } from '@/request/request.ts'
const formLabelWidth = '70px'
interface LinkItem {
    value: string
    link: string
}
const links = ref<LinkItem[]>([])
const loadAll = () => {
    return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
}
const radio = ref('true')
//工作区
const dialogFormVisible = ref(false)
let index = ref(0)
let datalabel = ref([])
const form = ref({
    id: "",
    crop: "",
    source: "",
    time: "",
    weight: "",
    isTrade: null,
})
let cropData = reactive([{}])
//menuChange函数
import useRoute from '@/hooks/useRoute'
const { menuChange } = useRoute()

//listTable数据
import listTable from '@/data/lsitTable'
import { handleCurrentChange } from 'element-plus/es/components/tree/src/model/util.mjs';

//删除数据
const handleDel = ({ id }: any) => {
    index.value = listTable.cropData.value.findIndex(item => item.id === id)
    listTable.cropData.value.splice(index.value, 1)
}

//编辑数据-打开
const handleEdit = (res) => {
    console.log(res)
    datalabel.value = res
    dialogFormVisible.value = true
    //dialogFormVisible.value = true

    //index.value = listTable.cropData.value.findIndex(item => item.id === id)
    //form.value = listTable.cropData.value[index.value]
}
//编辑数据-提交
const onSubmit = () => {
    dialogFormVisible.value = false
    listTable.cropData.value[index.value] = form.value
}

//搜索
let input = ref("")
const onSearch = () => {
    const searchValue = input.value;
    const updatedData = cropData.filter(item => {
        return item.traceability_code === searchValue;
    });
    cropData = updatedData;
    nextTick(() => {
        // 这里可以放置需要在DOM更新后执行的代码
        console.log('表格应该已经更新了');
    });
    input.value = ""
};


//分页
let total = ref(2)
const handleCurrentChange = (val:any)=>{
    cropData.value = listTable.cropData.value.filter(item => Number(item.id) > (val-1)*10 && Number(item.id) < val*10)
}

//生命周期
onMounted(() => {
    getalldata()
    cropData = JSON.parse(localStorage.getItem('alldata'))
    cropData = cropData.filter(item => {
        return item.farmer_input.fa_fruitName != 'undefined' && item.farmer_input.fa_fruitName != ''
    })
    console.log(cropData)
    dialogFormVisible.value = true
    dialogFormVisible.value = false
    
})
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right {
            display: flex;
            align-items: center;

            .search {
                margin-right: 20px;
                display: flex;
                align-items: center;

                .el-button {
                    margin-left: 5px;
                }
            }
        }
    }

    .form {
        margin-top: 20px;
        width: 100%;
        height: 440px;
    }

    .bottom {
        display: flex;
        width: 100%;
        justify-content: center;
    }
}

.example-showcase .el-dropdown+.el-dropdown {
    margin-left: 15px;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
