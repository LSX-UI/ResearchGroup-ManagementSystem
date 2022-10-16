<template>
<div class="container">
<el-container style="height:100%">
<!-- 侧边栏内容开发 -->
  <el-aside width="auto">
    <Aside></Aside>
  </el-aside>
  <el-container>
    <el-header>
        <Header></Header>
    </el-header>
    <Tag/>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import Tag from '../components/Tag.vue'
export default {
    name:'Home',
    components:{
        Aside,
        Header,
        Tag
    },
    mounted(){
        //console.log(this,'main');
    }

}
</script>

<style scoped lang="less">
.el-container{
    height: 100vh;
}
.el-header{
    background-color: #8254e1;;
}
.el-aside{
    background-color: greenyellow;
}
.el-main{
    padding-top:0;
    background-color:#ffffff;
}
</style>