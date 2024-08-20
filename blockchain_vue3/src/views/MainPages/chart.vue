<template>
    <div class="charts">
        <el-row :gutter="20" class="firRow">
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>近7天朔源人数</p>
                        <hr>
                        <p>2</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>近7天朔源人数</p>
                        <hr>
                        <p>2</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>近7天朔源人数</p>
                        <hr>
                        <p>2</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>近7天朔源人数</p>
                        <hr>
                        <p>2</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="secRow">
            <el-col :span="14">
                <el-card>
                    <div class="lineChart" ref="lineChart"></div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card>
                    <div class="pieChart" ref="pieChart"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, ref, onMounted } from 'vue'
import { getnumber } from '@/request/request.ts'
let lineChart = ref()
let pieChart = ref()
onMounted(() => {
    getnumber()
    let myLineChart = echarts.init(lineChart.value)
    let lineOption = {
        title: {
            text: '朔源人数统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['上城区', '西湖区', '拱墅区', '临平区', '滨江区']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '上城区',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '西湖区',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '拱墅区',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '临平区',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '滨江区',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myLineChart.setOption(lineOption);

    let myPieChart = echarts.init(pieChart.value)
    let pieOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '上城区' },
                    { value: 735, name: '西湖区' },
                    { value: 580, name: '临平区' },
                    { value: 484, name: '拱墅区' },
                    { value: 300, name: '滨江区' }
                ]
            }
        ]
    };
    myPieChart.setOption(pieOption);
})


</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;

    .firRow {

        .card {
            height: 180px;

        }
    }

    .secRow {
        margin-top: 20px;

        .lineChart {
            height: 450px;
        }

        .pieChart {
            height: 450px;
        }
    }
}
</style>
