<template>
    <div class="tags">
        <el-tag 
        v-for="(item,index) in tags"
        :key="item.name"
        :closable="item.label!=='home'"
        :effect="$route.name==item.name?'dark':'plain'"
        @click="handleClick(item)"
        @close="handleClose(item,index)"
        size="small"
        color="#7c67d3"
        >
       {{item.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
    name:'Tag',
    data(){
      return {

      }
    },
    computed:{
        ...mapState({
            // 从其他的组件使用状态或方法名称的时候最好是复制，否则会很容易出问题的。
            tags:state=>state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({
            close:'closeTag'
        }
        ),
        handleClick(item){
        //   用户点击相应的标签后进行路由的跳转
        this.$router.push({name:item.name})
        },
        handleClose(item,index){
        //  标签的关闭
        const length=this.tags.length-1;
        this.close(item);
        // 点击的删除与当前路由不匹配的时候，不进行路由的跳转，返回空的形式
        if(item.name===this.$route.name){
            return ;
        }
        // 如果点击的是最右侧的标签删除项
        if(index===length){
           this.$router.push({name:this.tags[index-1].name});
        }else{
        // 中间部分则直接向右移动一位
           this.$router.push({name:this.tags[index].name})
        }
        }
    }
}
</script>

<style scoped lang="less">
.tags{
    margin: 5px 6px 0px 5px;
    background-color:#ffff;
    .el-tag{
        margin-right: 12px;
        background-color: #705bc4;
        border: none;
        outline: none;
        cursor: pointer;
    }
}
</style>