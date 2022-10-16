import Cookie from 'js-cookie';
export default{
    state:{
        // 登录验证的token
        token:'',
        // !实际的和后端进行接通的时候0925
        // token:localStorage.getItem('token名称')?localStorage.getItem('token名称'):''

        // 注册存储的新用户信息
        // userLists:[],
        // passwordLists:[],

        //! 更新当前页面显示的用户名信息0926
        currentUserName:'',

    },
    mutations:{
        // 设置删除和获取token函数组
        setToken(state,value){
            state.token=value;
            Cookie.set('token',value);
            localStorage.setItem('token',value);
        },
        getToken(state){
            state.token=state.token??Cookie.get('token')??localStorage.getItem('token');

        },
        clearToken(state){
            state.token='';
            Cookie.remove('token');
            localStorage.removeItem('token');
        },
        // 修改设置当前用户名的函数组
        setCurrentUsername(state,newCurrentName){
            state.currentUserName=newCurrentName;
            localStorage.setItem('currentUserName',newCurrentName);
        },
        getCurrentUsername(state){
            state.currentUserName=state.currentUserName??localStorage.getItem('currentUserName')??undefined;
        },
        clearCurrentUsername(state){
            state.currentUserName='';
            localStorage.removeItem('currentUserName');
        }
    }
}