<template>
     <el-row class="home" :gutter="20">
       <el-col :span="6"  style="margin-top:24px">
         <el-card shadow="hover" class="user">
            <div class="user-info">
                <img :src="userImage" alt="用户头像">
                <div class="user-msg">
                    <h3 style="font-size:20px;margin-top:12px;">当前用户：{{username}}
                      <span>权限：超级管理员</span>
                    </h3>     
                </div>
            </div>
            <hr>
            <div class="login-info">
                <p>本次登录时间：<span>{{loginTime}}</span></p>
                <p>上次登录地址：<span>成都</span></p>
            </div>
         </el-card>
           <!-- 当前页面展示的数据订单 -->
         <el-card class="weather-show" style="margin-top:16px;border-radius:16px solid red;">
              <!-- 天气页面情况展示0925 -->
              <div id="he-plugin-standard"></div>
              <!-- <h3 style="text-align:center;font-size: 22px;font-weight:200;">
              销量统计数据表(截至时间):{{}}
              </h3>
              <el-table 
               :data="tableData"
               style="width:100%"
               :stripe="true"
               >
                  <el-table-column 
                   v-for="(item,index) in tabelLabel"
                   :key="index"
                   :label="item"
                   :prop="index"
                   >
                  </el-table-column>
              </el-table> -->
         </el-card>
       </el-col>
       <el-col :span="18" style="margin-top:24px">
           <div class="orderPart">
              <el-card shadow="hover" class="userMsg" v-for="(item,index) in countData" :key="index" :body-style="{display:'flex',padding:0}">
                 <!-- 依据便利出的子项目中的属性进行样式赋值，动态样式绑定 -->
                  <i 
                  class="icon" :class="`el-icon-${item.icon}`" 
                  :style="{background:item.color}"
                  >
                  </i>
                  <div class="detailMsg">
                     <p class="orderNum">{{item.value}}</p>
                     <p class="orderTxt">{{item.name}}</p>
                  </div>
              </el-card>
           </div>
           <div class="typeGraph">
              <el-card style="height:300px">
                 <!-- <div style="height:300px" ref="showChart"></div> -->
                 <Echart style="height:300px" :chartData='charData.order'/>
              </el-card>
           </div>
           <div class="graph">
               <el-card style="height:280px">
                 <!-- <div style="height:270px" ref="userChart"></div> -->
                 <Echart style="height:270px" :chartData='charData.user'/>
               </el-card>
               <el-card style="height:280px;">
                 <!-- <div style="height:280px" ref="videoChart"></div> -->
                 <Echart style="height:270px" :chartData='charData.video'  :isAxisChart='false'/>
               </el-card>
           </div>
       </el-col>
     </el-row>
</template>
<script>
// 引入接口的请求数据
import {getData} from '../../api/data';
// 此种引入的方式是指以任意版本进行引入
// import * as echarts from 'echarts';
// 对echart封装的组件进行引入
import Echart from '../../components/Echarts.vue';
import {formDate} from '../../util/timeHandle';
export default {
  name:'home',
  components:{
    Echart,
  },
  data(){
    return {
      userImage:require('../../assets/images/user.png'),
      onlineTimer:null,
      tableData:[],
      tabelLabel:{
          name:'品牌名称',
          todayBuy:'今日销量',
          monthBuy:'月度销量',
          totalBuy:'总计销量',
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      charData:{
         order:{
            xData:[],
            series:[]
         },
         video:{
            series:[],
         },
         user:{
            xData:[],
            series:[]
         }
      }
    }
  },
  computed:{
     username(){
        return this.$store.state.user.currentUserName||localStorage.getItem('currentUserName');
     },
    //  返回登录的时间戳信息
     loginTime(){
        const logTime=this.$store.state.time.loginTime;
        const tagTime=formDate(logTime);
        return tagTime;
     },
  },
  methods:{
     insertWeather(){
        window.WIDGET={
          "CONFIG": {
              "layout": "2",
              "width": 360,
              "height": 460,
              "background": "1",
              "dataColor": "FFFFFF",
              "key": "af0abb5d5dac40769f286b0db3143149"
           }
        }
      let script=document.createElement('script');
      script.src='https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
      document.body.appendChild(script);
     },
  },
  mounted(){
    // 组件挂载后直接调用获取天气状态的方法0926
     this.insertWeather();
     getData().then(res=>{
      // 使用es6的语法进行解构赋值
       const {code,data}=res.data;
      //  console.log(data)
       if(code==20000){
        console.log('#',data);
          this.tableData=data.tableData;
          // 将返回的数据中进行图表信息的配置
          const order=data.orderData;
          // 图表的配置项中x轴为时间。
          const xData=order.date;
          const keyArray=Object.keys(order.data[0]);
          // 按照图表中需要展示的信息内容确定项目数量
          const series=[];
          keyArray.forEach((key)=>{
            const serie={
              name:key,
              type:'line',
              data:order.data.map(item=>item[key])
            }
            series.push(serie);
          })
          // 使用封装好的echart组件进行传递
          this.charData.order.xData=xData;
          this.charData.order.series=series;
          // 使用原生的echarts图表进行绘制
          // const option={
          //    title:{
          //      text:'各大品牌手机销量统计'
          //    },
          //    legend:{
          //      data:keyArray
          //    },
          //    tooltip:{
               
          //    },
          //    xAxis:{
          //     data:xData,
          //    },
          //    yAxis:{

          //    },
          //    series
          // }
          // const Es=echarts.init(this.$refs.showChart);
          // Es.setOption(option);
      //  #region 
      // 用户信息柱状图
       const user=data.userData;
      //  const userOption={
      //       title:{
      //         text:'用户信息统计'
      //       },
      //       legend:{
      //         // 图例的文字颜色
      //         textStyle:{
      //           color:"#333",
      //           fontStyle:'italic',
      //           fontWeight:'bold',
      //         }
      //       },
      //       // 用于设置grid组件相对于父容器左边距的距离值
      //       // grid:{
      //       //   left:'20%'
      //       // },
      //       // 提示框
      //       tooltip:{
      //         trigger:'axis',
      //         icon:'roundRect'
      //       },
      //       xAxis: {
      //         // 类型为类目轴，可选类型根据数据还有value\time\log等三种
      //         type:'category',
      //         name:'用户类型',
      //         nameTextStyle:{
      //             color:"#ddd",

      //         },
      //         axisLine:{
      //            lineStyle:{
      //               color:'#17b9f4'
      //            }
      //         },
      //         axisLabel:{
      //            interval:0,
      //            color:"#333"
      //         },
      //        data:user.map(item=>item.date)
      //       },
      //       yAxis: {
      //         type:'value',
      //         axisLine:{
      //           lineStyle:{
      //             color:'#17b3a3'
      //           }
      //         }
      //       },
      //       color:['#3ec7ca','#4b6a6d '],
      //       series: [
      //         {
      //            name:'新增用户',
      //            type:'bar',
      //            data:user.map(item=>item.new)
      //         },
      //         {
      //           name:'活跃用户',
      //           type:'bar',
      //           data:user.map(item=>item.active)
      //         }
      //       ]
      //  }
      //  const Us=echarts.init(this.$refs.userChart);
      //  Us.setOption(userOption);
       this.charData.user.xData=user.map(item=>item.date);
       this.charData.user.series=[
              {
                 name:'新增用户',
                 type:'bar',
                 data:user.map(item=>item.new)
              },
              {
                name:'活跃用户',
                type:'bar',
                data:user.map(item=>item.active)
              }
            ]
      //  #endregion
       }

      //  #region
      // video相关视图
      const video=data.videoData;
      // const videoOption={
      //     tooltip: {
      //       trigger: 'item'
      //     },
      //     legend: {
      //       left: 'center'
      //     },
      //     series: [
      //       {
      //         name: '销量数据',
      //         type: 'pie',
      //         radius: ['40%', '70%'],
      //         avoidLabelOverlap: false,
      //         itemStyle: {
      //           borderRadius: 10,
      //           borderColor: '#fff',
      //           borderWidth: 2
      //         },
      //         label: {
      //           show: false,
      //           position: 'center'
      //         },
      //         emphasis: {
      //           label: {
      //             show: true,
      //             fontSize: '40',
      //             fontWeight: 'bold'
      //           }
      //         },
      //         labelLine: {
      //           show: false
      //         },
      //         data: video
      //       }
      //     ]        
      // }
      // const Vs=echarts.init(this.$refs.videoChart);
      // Vs.setOption(videoOption);

      this.charData.video.series=[
            {
              name: '销量数据',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: video
            }
          ]  
      // #endregion
     })
  },
  beforeDestroy(){
    // 组件销毁的时候清除当前的计时器。
    clearTimeout(this.onlineTimer);
  }
}
</script>

<style scoped lang="less">
.home{
  .user-info{
    display: flex;
    margin-bottom: 40px;
    img{
    height: 80px;
    width: 80px;
    border-radius: 40px;
    margin-left: 20px;
    margin-right: 30px;
  }
  h3{
    font-size: 26px;
    color: grey;
    span{
      display: block;
      font-size: 10px;
      margin-top: 8px;
      font-weight: 200;
    }
  }
  }
  .login-info{
    font-size: 16px;
    padding:12px 0;
    span{
      margin-left: 45px;
    }
  }
  .el-card__body{
    margin-top: 16px;
    height: 480px;
    border-radius: 16px solid red;
  }
  .orderPart{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    .userMsg{
      // 不清楚剩余空间的尺寸大小的时候，使用百分比进行空间的均匀分配效果
      width: 32%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .icon{
        font-size: 30px;
        text-align: center;
        width: 80px;
        height: 80px;
        line-height: 80px;
        color: #fff;
      }
      .detailMsg{
        display: inline-block;
        height: 100%;
        line-height: 100%;
        margin-left: 45px;
        .orderNum{
          font-size: 16px;
          margin-bottom: 5px;
          text-align: center;
          color: grey;
        }
        .orderTxt{
          font-size: 12px;
          text-align: center;
          color: coral;
        }
      }
    }
  }
  .graph{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .el-card{
      width: 49%;
    }
  }
}
</style>