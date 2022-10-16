<template>
    <div class="login-page">
        <div class="left-container">
            <img src="../../assets/images/loginInBack.svg" alt="右侧插画">
        </div>
        <div class="container-page">
            <el-form ref="form" :model="form" :rules="rules" label-width="auto">
             <h3 class="title">欢迎登录</h3>
             <div class="username">
                <!-- <i class="el-icon-user"></i> -->
                <el-form-item  prop="username" >
                  <span slot="label">
                     <span style="font-size:18px;font-family:'STKaiti';font-weight: bolder;color: white;">用户名称:</span>
                  </span>
                 <input type="text"  v-model="form.username" label="用户名称" style="font-size:18px"/>
             </el-form-item>
             </div>
            <div class="password"> 
                <!-- <i class="el-icon-s-grid"></i> -->
                <el-form-item  prop="password" > 
                  <span slot="label">
                     <span style="font-size:18px;font-family:'STKaiti';font-weight: bolder;color: white;">用户密码:</span>
                   </span>
                 <input  v-model="form.password" style="font-size:18px" type="password"/>
             </el-form-item>
            </div>
            <div class="btn-part">
            <el-form-item >
                <button  class="login" type="primary" @click="login"><label>登录</label></button>
                <span>没有账号？<router-link :to="{name:'register'}">免费注册</router-link></span>
                <div class="account-mseeage" style="background:skybluel;">
                    <button style="background:skyblue;border: none;font-size: 10px;padding: 6px;border-radius:5px;color: white;" @click="accountShow=!accountShow">{{accountShow?'账户信息隐藏':'账户信息提示'}}</button>
                    <div account-detail v-show="accountShow" style="height:30px">
                    <span style="font-size:10px;display:block;margin-bottom: 8px;">管理用户:<strong style="color:aqua"> 用户名admin，用户密码:123456</strong></span>
                    <span style="font-size:10px;display:block">普通用户:<strong style="color:aqua"> 用户名user，用户密码:123456</strong></span>
                    </div>      
                </div>
             </el-form-item>
            </div>
        </el-form>
        <div class="square">
            <ul>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
            </ul>
        </div>
        <div class="circle">
            <ul>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
               <li></li>
            </ul>
        </div>
        </div>

    </div>
</template>

<script>
import { nanoid } from 'nanoid';
import {getMenu} from '../../api/data';
export default {
    name:'LogIn',
    data(){
        return {
            form:{
                username:'',
                password:null,
            },
            // 当前登录时间记录。
            nowTime:0,
            accountShow:false,
            rules:{
              username: [
                 { required: true, message: '请输入用户名称', trigger: 'blur' },
                 { min: 3, max: 8, message: '长度限定 3 到 8 个字符', trigger: 'blur' }
              ],
              password:[
                  {required:true,message:'请输入用户密码',trigger:'blur'},
                  {min:4,max:12,message:'密码长度为4到12位',trigger:'blur'}
              ]
            }
        }
    },
    methods:{
        // 登录操作之后需要进行的逻辑
        login(){
            if(this.username==''||this.password===''){
                alert('用户名或密码不能为空');
            }
            else{
                // 修改vuex状态中的当前用户名称0926
                this.$store.commit('setCurrentUsername',this.form.username);
                // 获取当前时间并传递给vuex状态库0926
                this.getNowTime();
                this.$store.commit('setLoginTime',this.nowTime);
                // 发送请求获取不同账户下的菜单列表信息。
                getMenu(this.form).then((res)=>{
                console.log(res,'登录返回信息')
                if(res.data.code==20000){
                    // 登录成功后依据不同的登录账号和密码返回不同的路由界面
                    this.$message({
                        message:'登录成功！跳转到主页',
                        type:'success',
                    })
                    this.$store.commit('clearMenu');
                    this.$store.commit('setMenu',res.data.data.menu);
                    // 将生成的token注入到vuex中去。
                    this.$store.commit('setToken',res.data.data.token);
                    // 传入router，便于进行动态路由的注册实现。
                    this.$store.commit('addMenu',this.$router);
                    console.log(this.$router,'传过去的菜单参数为')
                    this.$router.push({name:'home'});
                }else{
                    setTimeout(()=>{
                        this.$message({
                        message:res.data.data.message,
                        type:'error'
                    })                       
                    },500)

                }
            })
            }
        },
        // 获取当前登录的时间，以便于记录用户在线时长数据信息0926
        getNowTime(){
            let time=new Date().getTime();
            this.nowTime=time;
        }

    }
}
</script>

<style lang="less" scoped>
.login-page{
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background:linear-gradient(200deg,#e3c5eb,#a9c1ed);
    overflow: hidden;
    .left-container{
        width: 48%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #aec0e2;
        height: 520px;
        border-radius: 32px;
        margin-right: 20px;
        z-index: 5;
        img{
            width: 620px;
            height: 480px;
        }
    }
    .el-form{
        position: relative;
        border-radius: 20px;
        width: 350px;
        height: 480px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px 16px 20px 16px;
        background-color: #a9c1ed;
        box-shadow: 5px 3px rgb(189, 147, 209,0.3);
        z-index: 3;
        .title{
            font-size: 46px;
            color: white;
            letter-spacing: 16px;
            font-family: "STKaiti";
            margin: 42px auto 68px auto;
        }
        .username,.password{
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 24px;
                color: skyblue;
            }
            .el-form-item {
                margin:12px 28px 12px 6px;
                input{
                    width: 240px;
                    border: none;
                    border-bottom: 1px solid plum;
                    text-indent: 2px;
                    outline: none;
                }
            }
        }
        .btn-part{
            display: flex;
            align-content: center;
            justify-content: center;
            flex-direction: column;
            padding: 12px auto 8px auto;
            margin-right: 99px;
            margin-top: 24px;
            .login{
                width:300px;
                height: 36px;
                font-size: 26px;
                letter-spacing: 16px;
                font-family: "STKaiti";
                // padding: 4px 8px;
                border: none;
                color: white;
                cursor: pointer;
                border-radius: 12px;
                background:linear-gradient(-200deg,#3197eb,#e6ece5);
                transition: 0.3s;
            }
            .login:hover{
                background:linear-gradient(-200deg,#aac2ee,#fac0e7);
                background-position-x: -300px;
            }
            span {
                text-align: center;
                display: inline-block;
                font-size: 16px;
                margin-top: 16px;
            }
            span a{
                color:crimson;
                text-decoration: none;
            }
        }

    }
    ul li{
        position: absolute;
        height: 30px;
        width: 30px;
        border: 1px solid #fff;
        list-style: none;
    }
    .square li{
        top: 40vh;
        left: 60vw;
        animation: square 8s linear infinite;

    }
    .square li:nth-child(2){
        top:80vh;
        left:10vw;
        animation-delay: 2s;
        opacity: 0.3;
    }
    .square li:nth-child(3){
        top:80vh;
        left:85vw;
        animation-delay: 3.5s;
    }
    .square li:nth-child(4){
        top:10vh;
        left: 70vw;
        animation-delay: 6s;
    }
    .square li:nth-child(5){
        top:12vh;
        left:10vw;
        animation-delay: 10s;
    }
    .circle li{
        bottom: 0;
        left: 16vw;
        animation: circle 10s linear infinite;
    }
    .circle li:nth-child(2){
        left: 36vw;
        animation-delay: 2.5s;
    }
     .circle li:nth-child(3){
        left: 68vw;
        animation-delay: 4.5s;
    }
    .circle li:nth-child(4){
        left: 78vw;
        animation-delay: 6.3s;
    }
    .circle li:nth-child(5){
        left: 86vw;
        animation-delay: 7.8s;
    }
    @keyframes square {
        0%{
            transform: scale(0) rotateX(0deg);
            opacity: 1;
        }
        50%{
            transform: scale(2) rotateY(200deg);
            opacity: 0.8;
        }
        100%{
            transform: scale(4) rotateY(1000deg);
            opacity: 0;
        }
    }
    @keyframes circle {
        0%{
            transform: scale(0) rotateY(0deg);
            opacity: 1;
            bottom: 0;
            border-radius: 0;
        }
        50%{
            transform: scale(2) rotate(200deg);
            opacity: 0.4;
            bottom: 30vh;
            border-radius: 30%;

        }
        100%{
            transform: scale(5) rotate(1000deg);
            opacity: 0;
            bottom: 90vh;
            border-radius: 50%;
        }
    }
}
</style>>
