<template>
    <div class="container">
        <div class="sider" >
            <sider></sider>
        </div>
        <!-- :style="`width: ${isCollapse?"63px":"200px"};`" -->
        <div class="main" :style="store.isCollapse?'padding-left:63px':'padding-left:200px'">
            <div class="top" @click="btn">
                <navigator></navigator>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import sider from '@/components/sider.vue'
import navigator from '@/components/navigator.vue'

import { useAllDataStore } from '@/store'
const store = useAllDataStore()
function btn (){
    console.log(store.isCollapse)
}
import { computed, reactive } from 'vue';
import { watch } from 'fs';

</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    .sider {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
    }

    .main {
        width: 100%;
        height: 100%;
        transition: .3s;
        .top {
            width: 100%;
            height: 60px;
            background-color: #e0e0e0;
        }

        .content {
            background-color: #f5f5f5;
            width: 100%;
            height: 100%;
            padding: 25px;
        }
    }
}
</style>