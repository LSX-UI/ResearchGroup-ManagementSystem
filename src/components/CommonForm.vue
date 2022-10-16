<template>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
          <el-input
            v-if="item.type==='input'"
            :placeholder="'请输入'+item.label"
            v-model="form[item.model]"
            style="display:inline"
            >
          </el-input>
          <el-date-picker
          v-if="item.type==='date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期"
          v-model="form[item.model]"
          >
          </el-date-picker>
          <el-switch 
          v-model="form[item.form]"
          v-if="item.type==='switch'">
          </el-switch>
          <!-- ! 尤其要注意select下拉框中数值的绑定问题 -->
          <el-select 
          v-if="item.type==='select'"
          placeholder="请选择性别"
          v-model="form[item.model]" 
          >
            <el-option
            v-for="option in item.opts"
            :key="option.index"
            :value="option.value"
            :label="option.label"
          ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
    // 一个表单类的公共组件，其类型和标签依据父组件通过props进行传递过来
   name:'commonForm',
//    其数据是通过父组件传递过来的，自身通过props进行接受
   props:{
     formLabel:Array,
     form:Object,
     inline:Boolean
   },
   data(){
     return {

     }
   }
}
</script>

<style scoped lang="less"> 

</style>