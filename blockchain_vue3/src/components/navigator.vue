<template>
    <div class="navigator">
        <div class="left">
            <el-button class="sider-shrink" @click="collapseChange" :icon="store.isCollapse ? Expand : Fold">
            </el-button>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }"> 首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="bread">{{ bread }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mid" v-if="store.isCollapse">
            <p>杭州市农产品朔源系统</p>
        </div>
        <div class="right">
            <el-dropdown  @click="handleClick">
                <div class="user">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p>admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>账户安全</el-dropdown-item>
                        <el-dropdown-item>关于我们</el-dropdown-item>
                        <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import {
    Fold,
    Expand,
} from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'

const handleClick = () => {
    // eslint-disable-next-line no-alert
    /*     alert('button click') */
}

import { useAllDataStore } from '@/store'
import { computed } from 'vue';
const store = useAllDataStore()
function collapseChange() {
    store.isCollapse = !store.isCollapse
    /*     console.log(store.isCollapse) */
}

const bread = computed(() => {
    return store.bread
})

const icon = computed(() => {
    return store.isCollapse ? "Expand" : "Fold"
})
import { useRouter } from 'vue-router'
const router = useRouter()
function logout(){
    router.push({ path: '/login' })
}
</script>

<style scoped>
.navigator {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .left {
        display: flex;
        align-items: center;

        .sider-shrink {
            margin-right: 15px;

        }
    }

    .right {

        .example-showcase .el-dropdown+.el-dropdown {
            margin-left: 15px;
        }

        .user{
            display: flex;
            align-items: center;

            p{
                margin-left: 10px;
                margin-right: 10px;
            }
        }

        .example-showcase .el-dropdown-link {
            cursor: pointer;
            color: var(--el-color-primary);
            display: flex;
            align-items: center;
        }
    }
}
</style>