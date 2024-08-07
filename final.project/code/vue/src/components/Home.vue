<template>
<!--  <div class="container">-->
  <div class="container">
    <el-row style="text-align: center;">
      <el-input style="width: 200px" v-model="keywords" placeholder="请输入关键词" suffix-icon="el-icon-search" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary" @click="renderCharts">搜索</el-button>
    </el-row>
    <el-row>
      <el-col :span="8" style="margin-right: 100px; margin-top: 100px;">
        <div id="main" style="width: 600px; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="wordcloud" style="width: 800px; height: 600px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud";

export default {
  name: "Home",
  data(){
    return {
      keywords: '',
      chart: null,
    }
  },
  methods: {
    renderBar(){
      let date = new Date().getTime();
      let dates = [];
      for(let i = 0; i < 5; i++){
          dates.unshift(date);
          date -= 86400*1000;
      }
      dates = dates.map(time => {
          let d = new Date(time);
          let year = d.getFullYear();
          let month = d.getMonth() + 1;
          let day = d.getDate();
          if(month >= 1 && month <= 9)
            month = "0" + month;
          if(day >= 0 && day <= 9)
            day = "0" + day;
          return (year + "-" + month + "-" + day);
      });
      let option = {
        title: {
          text: `时间热度分析`,
          subtext: this.keywords,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            interval: 0,
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            name: `包含关键词${this.keywords}的新闻个数`,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "top"
                }
              }
            }
          }
        ],
        legend: {
          show: true,
          type:'plain',
          right: 10,
          top: 20,
        }
      };

      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);
      if(this.keywords === ''){
        option.series[0].data = [0,0,0,0,0];
        myChart.setOption(option);
      }
      else{
        this.request.get("/hot",{params: {keywords: this.keywords}}).then(res => {
          let data = dates.map(date => {
            return res.data[date];
          })
          option.series[0].data = data;
          myChart.setOption(option);
        })
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("wordcloud"));
      let option = {
        series: [
          {
            type: "wordCloud",
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 15,
            shape: "pentagon",
            width: "100%",
            height: "100%",
            drawOutOfBound: true,
            textStyle: {
              color: function () {
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                  ].join(",") +
                  ")"
                );
              },
            },
            emphasis: {
              textStyle: {
                shadowBlur: 10,
                shadowColor: "#333",
                color: "red",
              },
            },
            data: [],
          },
        ],
      };
      this.request.get("wordcloud",{params: {keywords: this.keywords}}).then(res => {
        let keys = Object.keys(res);
        let data = [];
        for(let i = 0; i < keys.length; i++){
          let item = {name: keys[i],value: res[keys[i]]};
          data.push(item);
        }
        option.series[0].data = data;
        this.chart.setOption(option);
      })
    },
    renderCharts() {
      this.renderBar();
      this.initChart();
    },
  },
  mounted(){
    this.renderBar();
  }
}
</script>

<style scoped>
.container {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
}
</style>