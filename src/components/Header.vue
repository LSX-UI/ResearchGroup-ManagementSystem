<template>
   <div class="header">
        <div class="left-content">
            <el-button @click="changeIsCollapse" type="primary" icon="el-icon-menu" size="mini" :plain="true">                
            </el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
                    {{item.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>        
        </div>
        <div class="right-content">
        <h3 style="display:inline-block;margin-right:20px;color: white;">{{nowTime}}</h3>
        <el-dropdown @command="handleCommond">
        <img src="../assets/images/user.png" alt="userAvator" class="userImage">
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in rightMenu" :key="item.id" :command="item.label">
              {{item.label}}
            </el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </div>
   </div>
</template>

<script>
import {nanoid} from 'nanoid';
import { mapState } from 'vuex';
import Cookie from 'js-cookie';
export default {
    name:'Header',
    data(){
        return {
           rightMenu:[
               {
                  label:'个人主页',
                  id:nanoid(3),

               },
               {
                  label:'修个个人信息',
                  id:nanoid(3)
               },
               {
                  label:'退出登录',
                  id:nanoid(3)
               }
           ],
           timer:undefined,
           nowTime:'',
        }
    },
    computed:{
      ...mapState({
        tags:state=>state.tab.tabsList
      })
    },
    methods:{
        showId(){
            console.log(this.rightMenu);
        },
        // 点击完成侧边栏状态的收起与展开
        changeIsCollapse(){
            this.$store.commit('collapseMenu');
            console.log(this.$store.state.tab.isCollapse);
        },
        handleCommond(command){
            if(command==="退出登录"){
                // 退出登录页面，需要清除动态页面以及token值
                console.log('退出登录');
                Cookie.remove('menu');
                localStorage.removeItem('token');
                Cookie.remove('token');
                this.$router.push({name:'login'});
            }
        }
    },
    created(){
        this.timer=setInterval(()=>{
            this.nowTime=new Date().toLocaleString();
        })
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
}
</script>

<style scoped lang="less">
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    .left-content{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        .el-button{
            margin-right: 12px;
            border: none;
            background-color: rgb(187, 103, 226);
            color: white; 
        }
        .breadcrumb__inner:hover{
            color:#fff;
            cursor: pointer;
        }
        .el-breadcrumb__item{
            color: #fff;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .right-content{
       display: flex;
       justify-content: center;
       align-items: center;
      .userImage{
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
    }
}
.el-breadcrumb__inner.is-link{
    color: #fff;
}

</style>