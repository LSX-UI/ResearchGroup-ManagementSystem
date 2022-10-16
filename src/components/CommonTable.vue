<template>
  <div class="common-table">
      <el-table
        :data="tableData"
        style="height:80%"
        :stripe="true"
        :border="false"
      >
       <el-table-column
       show-overflow-tooltip
       v-for="item in tableLabel"
       :key="item.label"
       :label="item.label"
       :width="item.width?item.width:160" 
        >
         <!-- 使用模板标签不会改变原生的dom结构,渲染拿到的数据内容 -->
        <template slot-scope="scope">
            <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
        </template>
       </el-table-column>
       <!-- 编辑操作栏 -->
       <el-table-column label="编辑" min-width="180">
           <!-- 使用作用域插槽获取到父组件传递过来的人员信息 -->
           <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
           </template>
       </el-table-column>
      </el-table>
    <div class="pagination" style="height:30px;margin:6px 6px 12px 0;width: 100%;">
      <el-pagination
      :page-size="20"
      layout="prev,pager,next"
      :total="paginationConfig.total"
      :current-page.sync="paginationConfig.page"
      prve-text="上一页"
      next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
   name:'CommonTable',
   props:{
        tableData: Array,
        tableLabel: Array,
        paginationConfig:Object,  
   },
   data(){
     return {

     }
   },
   methods:{
     handleEdit(row){
        this.$emit('edit',row);
     },
     handleDelete(row){
        this.$emit('dele',row);
     },
     pageChange(page){
        this.$emit('changePage',page);
     }
   },
   mounted(){
   }
  
}
</script>

<style scoped lang="less">
.common-table{
  //width: calc(100%-62px);
  position: relative;
  background-color: #fff;
  .el-pagination{
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
}
</style>