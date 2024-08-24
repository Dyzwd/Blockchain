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
                    <el-input v-model="serachInput" style="width: 240px" placeholder="请输入要查询的内容" clearable />
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
            <el-table :data="cropDataShow" style="width: 100%">
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
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <el-pagination size="default" background layout="prev, pager, next" class="mt-4"/>
        </div>

    </div>
    <!-- dialog1 -->
    <el-dialog v-model="dialogFormVisible" title="详情" width="800" center>
        <el-form>
            <el-descriptions title="种植园信息" :column="3" border>
                <el-descriptions-item label="菜品" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{ datalabel.farmer_input.fa_fruitName }}
                </el-descriptions-item>
                <el-descriptions-item label="朔源码" label-align="right" align="center" width="150px">
                    {{ datalabel.traceability_code }}
                </el-descriptions-item>
                <el-descriptions-item label="播种时间" label-align="right" align="center" width="150px">
                    {{ datalabel.farmer_input.fa_plantTime }}
                </el-descriptions-item>
                <el-descriptions-item label="采摘时间" label-align="right" align="center">
                    {{ datalabel.farmer_input.fa_pickingTime }}
                </el-descriptions-item>
                <el-descriptions-item label="源产地" label-align="right" align="center">
                    {{ datalabel.farmer_input.fa_origin }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="工厂信息" :column="3" border style="margin-top: 10px;">
                <el-descriptions-item label="工厂名" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{ datalabel.factory_input.fac_factoryName }}
                </el-descriptions-item>
                <el-descriptions-item label="产品" label-align="right" align="center" width="150px">
                    {{ datalabel.factory_input.fac_contactNumber }}
                </el-descriptions-item>
                <el-descriptions-item label="播种时间" label-align="right" align="center" width="150px">
                    {{ datalabel.factory_input.fac_productionbatch }}
                </el-descriptions-item>
                <el-descriptions-item label="采摘时间" label-align="right" align="center">
                    {{ datalabel.factory_input.fac_timestamp }}
                </el-descriptions-item>
                <el-descriptions-item label="源产地" label-align="right" align="center">
                    {{ datalabel.factory_input.fac_productionTime }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="物流信息" :column="3" border style="margin-top: 10px;">
                <el-descriptions-item label="配送人" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{ datalabel.driver_input.dr_name }}
                </el-descriptions-item>
                <el-descriptions-item label="联系电话" label-align="right" align="center" width="150px">
                    {{ datalabel.driver_input.dr_phone }}
                </el-descriptions-item>
                <el-descriptions-item label="出发时间" label-align="right" align="center" width="150px">
                    {{ datalabel.driver_input.dr_timestamp }}
                </el-descriptions-item>
                <el-descriptions-item label="运送方式" label-align="right" align="center">
                    {{ datalabel.driver_input.dr_transport }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="营销信息" :column="3" border style="margin-top: 10px;">
                <el-descriptions-item label="店铺名" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{ datalabel.shop_input.sh_shopName }}
                </el-descriptions-item>
                <el-descriptions-item label="工作时间" label-align="right" align="center" width="150px">
                    {{ datalabel.shop_input.sh_selltime }}
                </el-descriptions-item>
                <el-descriptions-item label="联系电话" label-align="right" align="center" width="150px">
                    {{ datalabel.shop_input.sh_shopPhone }}
                </el-descriptions-item>
                <el-descriptions-item label="店铺地址" label-align="right" align="center">
                    {{ datalabel.shop_input.sh_shopAddress }}
                </el-descriptions-item>
            </el-descriptions>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//附件区（一般不改）
import { ref, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {
    Edit,
    Search,
} from '@element-plus/icons-vue'
import { getalldata } from '@/request/request.ts'
const serachInput = ref('')
//工作区
const dialogFormVisible = ref(false)
let datalabel = ref({
    traceability_code:'',
    shop_input:{},
    factory_input:{},
    driver_input:{},
    farmer_input:{}
})
let cropData = ref([{}])
let cropDataShow = ref([{}])
//menuChange函数
import useRoute from '@/hooks/useRoute'
const { menuChange } = useRoute()

//编辑数据-打开
const handleEdit = (res: any) => {
    datalabel.value.traceability_code = res.traceability_code
    datalabel.value.factory_input = res.factory_input
    datalabel.value.farmer_input = res.farmer_input
    datalabel.value.driver_input = res.driver_input
    datalabel.value.shop_input = res.shop_input
    dialogFormVisible.value = true
    console.log(datalabel.value)
}


//搜索
let input = ref("")
const onSearch = () => {
    cropDataShow.value = cropData.value.filter(item => item.farmer_input.fa_fruitName.match(input.value))
}
watch(input, (news) => {
    if (news === "") {
        cropDataShow.value = cropData.value
    }
})

//分页

//数据获取
const getData = () => {
    getalldata()
    cropData = JSON.parse(localStorage.getItem('alldata'))
    cropData = cropData.filter(item => {
        return item.farmer_input.fa_fruitName != 'undefined' && item.farmer_input.fa_fruitName != ''
    })
    cropDataShow.value = cropData.value
    console.log(cropData.value)
}
getData();



</script>

<style scoped>
:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
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
