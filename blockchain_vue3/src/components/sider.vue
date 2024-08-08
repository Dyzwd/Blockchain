<template>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <p class="title" v-if="!isCollapse">杭州市农产品朔源系统</p>
        <p class="title" v-if="isCollapse">农</p>
        <el-menu-item index="1" @click="menuChange('/home/chart')">
            <el-icon><icon-menu /></el-icon>
            <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="2" @click="menuChange('/home/list')">
            <el-icon>
               <Histogram />
            </el-icon>
            <template #title>农产品数据</template>
        </el-menu-item>
        <el-menu-item index="3" @click="menuChange('/home/typein')">
            <el-icon>
                <Edit />
            </el-icon>
            <template #title>农产品数据录入</template>
        </el-menu-item>
        <el-menu-item index="4" @click="menuChange('/home/trade')">
            <el-icon>
                <ShoppingCart />
            </el-icon>
            <template #title>交易市场</template>
        </el-menu-item>
        <el-menu-item index="5" @click="menuChange('/home/user')">
            <el-icon>
                <Avatar />
            </el-icon>
            <template #title>个人中心</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref,computed,watch } from 'vue'
import {
    Menu as IconMenu,
    Histogram,
    Edit,
    Avatar,
    ShoppingCart,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
    /* console.log(key, keyPath) */
}
const handleClose = (key: string, keyPath: string[]) => {
    /* console.log(key, keyPath) */
}

import { useAllDataStore } from '@/store'
import { useRouter } from 'vue-router'
const store = useAllDataStore()
/* console.log(store.isCollapse) */
let isCollapse = computed(()=>{
    return store.isCollapse
})
const router = useRouter()
const menuChange = (res:any)=>{
    router.push({ path: res })
    if(res == '/home/chart'){
        store.bread = ""
    }
    if(res == '/home/list'){
        store.bread = "农产品数据"
    }
    if(res == '/home/typein'){
        store.bread = "农产品数据录入"
    }
    if(res == '/home/trade'){
        store.bread = "交易市场"
    }
    if(res == '/home/user'){
        store.bread = "个人中心"
    }
}



</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}

.title{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    white-space:nowrap;
    overflow: hidden;
}
</style>