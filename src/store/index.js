import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';
import user from './user';
import time from './time';
Vue.use(Vuex);
// 不同模块的state分区域管理
export default new Vuex.Store({
    modules:{
        tab,
        user,
        time  
    }
})