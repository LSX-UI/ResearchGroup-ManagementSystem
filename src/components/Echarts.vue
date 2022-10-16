<template>
   <div ref="echart">

   </div>
</template>

<script>
// 以任意形式的版本号进行echarts的引入功能创建
import * as echarts from 'echarts';
export default {
     name:'Echarts',
     data(){
        return {
            // 柱状图的option项目
            axisOption:{
               title:{
                  text:''
                 },
               legend:{
                    // 图例的文字颜色
                    textStyle:{
                        color:"#333",
                        fontStyle:'italic',
                        fontWeight:'bold',
                    }
                    },
                    // 用于设置grid组件相对于父容器左边距的距离值
                    // grid:{
                    //   left:'20%'
                    // },
                    // 提示框
               tooltip:{
                    trigger:'axis',
                    icon:'roundRect'
                    },
               xAxis: {
                    // 类型为类目轴，可选类型根据数据还有value\time\log等三种
                    name:'用户类型',
                    nameTextStyle:{
                        color:"#ddd",

                    },
                    axisLine:{
                        lineStyle:{
                            color:'#17b9f4'
                        }
                    },
                    axisLabel:{
                        interval:0,
                        color:"#333"
                    },
                    data:[]
                    },
                yAxis: {
                    type:'value',
                    axisLine:{
                        lineStyle:{
                        color:'#17b3a3'
                        }
                    }
                    },
                    color:['#3ec7ca','#4b6a6d '],
                    series: []
            },
            // 饼状图的option配置项目
            barOption:{
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'center'
                },
                series: []        
              },
            // 判断echart是否已经渲染过
            echart:null,
            } 
        },
     props:{
        // 判断表格的类型
        isAxisChart:{
            type:Boolean,
            default:true,
        },
        // 图表的数据
        chartData:{
            type:Object,
            default(){
                return {
                    xData:[],
                    series:[], 
                }
            }
        }
     },
     computed:{
        // 根据图表类型进行配置项目的选择。
        options(){
            return this.isAxisChart?this.axisOption:this.barOption;
        }
     },
     watch:{
        // 使用监视属性，当数据发生变化的时候，重新触发图表的绘制函数
        chartData:{
            handler:function(){
                this.initChart();
            },
            // 使用配置项目开启深度监视
            deep:true
        }


     },
     methods:{
        initChart(){
            this.initChartData();
            // 完成数据的初始化之后，在依据echart是否已经存在进行图表的绘制工作
            if(this.echart){
                this.echart.setOption(this.options); 
            }else{
                this.echart=echarts.init(this.$refs.echart);
                this.echart.setOption(this.options);
            }
        },
        initChartData(){
        // 根据图表类型进行配置项目的选择
          if(this.isAxisChart){
             this.axisOption.xAxis.data=this.chartData.xData;
             this.axisOption.series=this.chartData.series;
          }else{
             this.barOption.series=this.chartData.series;
          }
        }
     }
     }

</script>

<style scoped lang="less">

</style>