<template>
  <div id="app">
    <!-- ! 通过路由导航显示对应的页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
