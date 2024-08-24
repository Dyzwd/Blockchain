<template>
    <div class="charts">
        <el-row :gutter="20" class="firRow">
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>交易笔数</p>
                        <hr>
                        <p>{{chart_one}}</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>区块数</p>
                        <hr>
                        <p>{{chart_two}}</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>网站访问量</p>
                        <hr>
                        <p>{{chart_three}}</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="card">
                        <p>市场订单量</p>
                        <hr>
                        <p>{{chart_four}}</p>
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
let chartData = ref([{}])
let lineChart = ref()
let pieChart = ref()
let chart_one = ref()
let chart_two = ref()
let chart_three = ref()
let chart_four = ref()
let line_one = []
onMounted(() => {
    getnumber()
    let leng = JSON.parse(localStorage.getItem('numbers')).length
    
    chartData.value = JSON.parse(localStorage.getItem('numbers'))[leng - 1] 
    chart_one.value = JSON.parse(chartData.value.one)[0]
    chart_two.value = JSON.parse(chartData.value.one)[1]
    chart_three.value = JSON.parse(chartData.value.one)[2]
    chart_four.value = JSON.parse(chartData.value.one)[3]
    line_one = JSON.parse(chartData.value.two)
    console.log(line_one)
    console.log(chart_one)
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
                data: line_one[0]
            },
            {
                name: '西湖区',
                type: 'line',
                stack: 'Total',
                data: line_one[1]
            },
            {
                name: '拱墅区',
                type: 'line',
                stack: 'Total',
                data: line_one[2]
            },
            {
                name: '临平区',
                type: 'line',
                stack: 'Total',
                data: line_one[3]
            },
            {
                name: '滨江区',
                type: 'line',
                stack: 'Total',
                data: line_one[4]
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
                    { value: line_one[0].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0), name: '上城区' },
                    { value: line_one[1].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0), name: '西湖区' },
                    { value: line_one[2].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0), name: '临平区' },
                    { value: line_one[3].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0), name: '拱墅区' },
                    { value: line_one[4].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0), name: '滨江区' }
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
