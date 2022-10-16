// 控制显示当前时间内容
export default{
    state:{
         loginTime:0,    
    },
    mutations:{
        setLoginTime(state,value){
            state.loginTime=value;
            // 利用sessionStorage存储当前登录时间。  
            sessionStorage.setItem('loginTime',state.loginTime);
        },
        getLoginTime(state){
            state.loginTime=state.loginTime??sessionStorage.getItem('loginTime');
        }
    },
    actions:{

    },
    getters:{

    }
}