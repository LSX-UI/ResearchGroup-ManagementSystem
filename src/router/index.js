import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import LogIn from '../views/Login/index.vue';
import Register from '../views/Register/index.vue';
import Home from '../views/Home/index.vue';
import User from '../views/User/index.vue';
import Mall from '../views/Mall/index.vue';
import PageOne from '../views/other/pageOne.vue';
import PageTwo from '../views/other/pageTwo.vue';
// 引入vuex中配置的store进行更改token0925
import store from '../store/index';
Vue.use(VueRouter);
// 进行全局路由信息的配置
const routes=[
    {
        path:'/',
        name:'Main',
        component:Main,
        // 重定向，当为指定的时候加载默认跳转到登录界面中
        redirect:'/login',
        // 配置path和name的时候一般小写会更好
        children:[
            // {
            //    path:'/user',
            //    name:'user',
            //    component:User,
            // },
            // {
            //     path:'/home',
            //     name:'home',
            //     component:Home,
            // },
            // {
            //     path:'/mall',
            //     name:'mall',
            //     component:Mall,
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component:PageOne,
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component:PageTwo,
            // }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:LogIn,
    },
    {
        path:'/register',
        name:'register',
        // !直接按需要进行引入，按需引入实现路由的懒加载
        component:Register

    }
]
const router=new VueRouter({
    routes,
})

// 利用前置的路由导航守卫0925
router.beforeEach((to,from,next)=>{
    console.log(to,'#');
    if(to.name==='login'){
        next();
    }
    //! 检查是否有token
    store.commit('getToken');
    const token=store.state.user.token;
    if(token===null&&token===''){
       next({name:'login'});
    }else{
      next();
    }
})

export default router;