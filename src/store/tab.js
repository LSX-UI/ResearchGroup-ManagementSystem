// 控制右侧菜单的折叠与展开功能
import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home',
                url:'Home/Home'
            }
        ],
        currentMenu:null,
        menu:[]
    }, 
    mutations:{
       collapseMenu(state){
          state.isCollapse=!state.isCollapse;
       },
       selectMenu(state,val){
         if(val.name!=='home'){
            state.currentMenu=val;
            let result=state.tabsList.findIndex((item)=>item.name===val.name);
            if(result===-1){
                state.tabsList.push(val);
            }
         }else{
            state.currentMenu=null;
         }
       },
    //    删除小标签，重新进行一个渲染操作
        closeTag(state,val){
        // 操作数据之前找到元素的索引值，然后使用数组方法进行操作数组。
        let index=state.tabsList.findIndex((item)=>item.name===val.name);
        state.tabsList.splice(index,1);
        },
        // ! 登录菜单权限校验
        setMenu(state,val){
            state.menu=val;
            // Cookie需要存储的是字符串，需要调用JSON.stringify将其序列化
            Cookie.set('menu',JSON.stringify(val));
            console.log()
        },
        clearMenu(state){
            state.menu=[];
            Cookie.remove('menu');
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return;
            }
            const menu=JSON.parse(Cookie.get('menu'));
            state.menu=menu;
            // 组装动态路由的相关数据信息。
            const menuArray=[];
            menu.forEach(item=> {
                //! 有没有子菜单，判断是否需要进行二次遍历呢？
                if(item.children){
                    item.children=item.children.map((item)=>{
                        // 添加路由组件的属性
                        item.component=()=>import(`../views/${item.url}`);
                        return item;
                    })
                    // 通过扩展运算符的形式
                    menuArray.push(...item.children);
                }else{
                    item.component=()=>import(`../views/${item.url}`);
                    menuArray.push(item);
                }   
            });
            // 路由的动态添加
            menuArray.forEach((item)=>{
                //获取到后台发过来的数据 路由的动态添加
                router.addRoute('Main',item)
            })
        }
    }
}