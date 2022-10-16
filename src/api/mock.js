import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';
import permissionApi from './mockServeData/permission';
// !使用mockjs模拟拦截的路径url的时候可以选择字符串形式和正则表达式两种形式
Mock.mock('/home/getData',homeApi.getStatisticalData);
Mock.mock(/user\/edit/,'post',userApi.updateUser);
Mock.mock(/user\/add/,'post',userApi.createUser);
Mock.mock(/user\/getUser/,'get',userApi.getUserList);
Mock.mock(/user\/delUser/,'post',userApi.deleteUser);
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu);