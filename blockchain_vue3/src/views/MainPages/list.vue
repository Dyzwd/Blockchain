<template>
    <div class="container">
        <div class="top">
            <div class="left">
                <el-button type="success">新增
                    <Edit style="width: 1em; height: 1em; margin-left: 8px;" />
                </el-button>
            </div>
            <div class="right">
                <div class="search">
                    <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入查询数据"
                        @select="handleSelect" />
                    <el-button :icon="Search" type="primary" circle />
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
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="date" label="时间" width="360" />
                <el-table-column prop="name" label="农产品" width="360" />
                <el-table-column prop="address" label="地点" />
            </el-table>
        </div>
        <div class="bottom">
            <el-pagination size="default" background layout="prev, pager, next" :total="50" class="mt-4" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
interface User {
    date: string
    name: string
    address: string
}

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: User
    rowIndex: number
}) => {
    if (rowIndex === 1) {
        return 'warning-row'
    } else if (rowIndex === 3) {
        return 'success-row'
    }
    return ''
}

const tableData: User[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },

]
const state = ref('')
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
let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value

    clearTimeout(timeout)
    timeout = setTimeout(() => {
        cb(results)
    }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}
onMounted(() => {
    links.value = loadAll()
})

import { ArrowDown } from '@element-plus/icons-vue'

const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('button click')
}
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
    }

    .bottom{
        display: flex;
        margin-top: 20px;
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
