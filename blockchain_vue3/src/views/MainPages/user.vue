<template>
    <el-row>
        <el-col :span="10">
            <el-card>
                <div class="user">
                    <div class="user-top">
                        <div class="user-top-left">
                            <el-avatar class="user-img"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </div>
                        <div class="user-top-right">
                            <p class="user-name">admin</p>
                            <p class="user-identity">超级管理员</p>
                        </div>
                    </div>
                    <hr>
                    <div class="user-bottom">
                        <p>上次登录时间：2024.6.3</p>
                        <p>上次登录地点：杭州</p>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { spawn } from 'child_process';


</script>

<style scoped>
.user {
    display: flex;
    flex-direction: column;
    padding: 20px;

    .user-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:1px solid #ccc;
        padding-bottom: 20px;
        .user-img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        .user-top-right {
            p {
                line-height: 40px;
            }

            .user-identity {
                color: #999;
            }

            .user-name {
                font-size: 35px
            }
        }
    }

    .user-bottom {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;
            
            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

}

</style>