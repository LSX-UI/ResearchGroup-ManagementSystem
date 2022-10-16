import Vue from 'vue'
import App from './App.vue'
//! element-ui的按需引入以减小打包后的文件的体积
import {
  Button, Container, Aside, Header, Main, Menu,
  Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu,
  DropdownItem, Col, Row, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem,
  Tag,Dialog,Select,Switch,Input,Option,DatePicker,Form,FormItem,Pagination,
  MessageBox,Message
} from 'element-ui';
//! 引入路由和vuex状态库
import router from './router'
import store from './store'
import http from 'axios'
//! 直接引入mock表示我们将要使用到这里面产生的数据信息
import './api/mock'
// 关闭vue的生产模式提示信息
Vue.config.productionTip = false
// 第三方插件库的使用axios，将其挂载到组件实例的原型上，这样所有的组件实例对象都可以使用http进行发送请求了。
Vue.prototype.http = http
// ! 将相关提示组件中的方法绑定到vue的原型上面
Vue.prototype.$confirm=MessageBox.confirm
Vue.prototype.$message=Message
// ui组件库中element-ui的引入和使用
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

new Vue({
  render: h => h(App),
  router,
  store,
  // 调用生命周期钩子函数created
  created(){
    store.commit('addMenu',router);
  }
}).$mount('#app')
