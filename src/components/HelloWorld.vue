<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-Button @click="innitMessage">点击弹窗</el-Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    innitMessage(){
      alert('开启后台管理系统的开发之旅');
      prompt('输入您的开启日期以及日程规划',"1999");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
