<template>
  <el-menu default-active="1-4-1" background-color="#5840ba" text-color="#f4f4f4" active-text-color="#3d8beb" class="el-menu-vertical-demo" :collapse="isCollapse">
  <div class="icon-main">
     <img src="../assets/icons/main-icon.svg" alt=" 首页图标">
     <h4 v-show="!isCollpase" style="letter-spacing:6px">{{isCollapse?'事务后台':'研究生事务管理后台'}}</h4>
  </div>
  <br>
  <el-menu-item @click="linkRouter(firstMenu)" v-for="firstMenu in onlyFirstMenu" :index="firstMenu.path" :key="firstMenu.path">
  <!-- 加上v-bind的简写形式:是为了图标样式以js的表达式执行 -->
    <i :class="'el-icon-'+firstMenu.icon"></i>
    <span slot="title">{{firstMenu.label}}</span>
  </el-menu-item>
  <el-submenu v-for="secondMenu in hasSecondMenu" :index="secondMenu.label"  :key="secondMenu.path">
    <template slot="title">
      <i :class="'el-icon-'+secondMenu.icon"></i>
      <span slot="title">{{secondMenu.label}}</span>
    </template>
    <el-menu-item-group  v-for="secondMenuItem in secondMenu.children"  :index="secondMenuItem.path" :key="secondMenuItem.path">
      <el-menu-item @click="linkRouter(secondMenuItem)" index="secondMenuIndex">
      {{secondMenuItem.label}}
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    name:'Aside',
    data() {
      return {
        systemName:'课题组后台',
      };
    },
    computed:{
      onlyFirstMenu(){
         return  this.asyncAsideMenu.filter((item)=>!item.children);
      },
      hasSecondMenu(){
         return this.asyncAsideMenu.filter((item)=>item.children);
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse;
      },
      //! 获取vuex中的从后台获取的menu
      asyncAsideMenu(){
        // 判断当前的数据，如果缓存中没有，则从store中进行获取
        let menu=JSON.parse(Cookie.get('menu'));
        return menu||this.$store.state.tab.menu;
      }
    },
    methods: {
    //点击路由进行跳转导航
      linkRouter(menuItem){
          this.$router.push({
              name:menuItem.name
          });
          // 点击行为修改store中的tabsList的数据信息。
          this.$store.commit('selectMenu',menuItem);
      },
    },
    mounted(){
    }
}
</script>

<style scoped lang="less">
.icon-main{
  display: flex;
  flex-direction: column;
  justify-items:center;
  align-items: center;
  max-width: 200px;
  img{
    width: 60px;
    height: 60px;
    display: block;
    margin-top: 15px;
  }
  h4{
    margin-top: 0;
    line-height: 60px;
    text-align: center;
    height: 60px;
    color: white;
  }
}

.icon-main::after{
  display: block;
  max-width:200px;
  height: 5px;
  color: white;
  
}
.el-menu{
    height: 100%;
    margin: 0;
    border: none;
    .el-icon-help{
      color: skyblue;
      margin-left: 6px;
      margin-right: 8px;
    }
    h3{
        color: white;
        line-height: 60px;
        margin: 16px 12px 16px 12px;
    }
}
.el-menu-item i,.el-submenu i{
  color:white;
  font-size: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>