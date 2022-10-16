<template>
    <div class="login-page">
        <div class="left-container">
            <img src="../../assets/images/loginInBack.svg" alt="右侧插画">
        </div>
        <div class="container-page">
            <el-form ref="form" :model="form" :rules="rules" label-width="auto">
             <h3 class="title">用户注册</h3>
             <div class="username">
                <!-- <i class="el-icon-user"></i> -->
                <el-form-item  prop="username" >
                  <span slot="label">
                     <span style="font-size:18px;font-family:'STKaiti';font-weight: bolder;color: white;">用户名称:</span>
                  </span>
                 <input type="text"  v-model="form.username" style="font-size:18px"  label="用户名称"/>
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
            <div class="confirm-password"> 
                <!-- <i class="el-icon-s-grid"></i> -->
                <el-form-item  prop="password" > 
                  <span slot="label">
                     <span style="font-size:18px;font-family:'STKaiti';font-weight: bolder;color: white;">确定密码:</span>
                   </span>
                 <input  v-model="form.comfirmPassword" style="font-size:18px" type="password"/>
             </el-form-item>
            </div>
            <div class="btn-part">
                <el-form-item >
                <button  class="login" type="primary" @click="register"><label>注册</label></button>
                <span>已有账号？<router-link :to="{name:'login'}">直接登录</router-link></span>
                    <!-- <a href="#">点击直接登录！</a> -->
                <!-- <button  class="register" type="primary" @click="register"><label>注册</label></button> -->
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
// import { nanoid } from 'nanoid';
// import {getMenu} from '../../api/data';
export default {
    name:'LogIn',
    data(){
        return {
            userList:[],
            passwordList:[],
            form:{
                username:'',
                password:null,
                comfirmPassword:null
            },
            rules:{
              username: [
                 { required: true, message: '请输入用户名称', trigger: 'blur' },
                 { min: 3, max: 8, message: '长度限定 3 到 8 个字符', trigger: 'blur' }
              ],
              password:[
                  {required:true,message:'请输入用户密码',trigger:'blur'},
                  {min:4,max:12,message:'密码长度为4到12位',trigger:'blur'}
              ],
              comfirmPassword:[
                  {required:true,message:'确定用户密码',trigger:'blur'},
                  {min:4,max:12,message:'密码长度为4到12位',trigger:'blur'}
              ],
            }
        }
    },
    methods:{
        register(){
             let usernameFormat=this.validateUsernameFormat(this.form.username);
             let passwordFormat=this.validatePasswordFormat(this.form.password);
            //  第一步验证用户名和密码是否满足条件
             if(usernameFormat&&passwordFormat&&this.form.password==this.form.comfirmPassword){
                 localStorage.setItem(`${this.form.username}`,this.form.username);
                 localStorage.setItem(`${this.form.username}Password`,this.form.password);
                 this.$message.success('注册成功！跳转到登录界面');
                 this.$router.push({name:'login'});  
             }else{
                return ;
             }
        },
        // 验证用户名是否满足条件
        validateUsernameFormat(username){
            // 用户名不合理的有哪些情况？第一个是长度不合格，第二个是用户名称已经存在，请重新输入用户名，第三个是用户名组合不满足要求
            let localStorageUsername=localStorage.getItem(username);
            if(username.length<5||username.length>20){
                this.$message.warning('用户名称长度小于5位或长于20位！');
                return false;
            }else if(localStorageUsername){
                this.$message.warning('用户名已经存在，请重新输入');
                return false;
            }else if(username==''){
                this.$message.warning('用户名不能为空！');
                return false;
            }else{
                return true;
            }
        },
        // 验证密码的格式是否满足要求
        validatePasswordFormat(password){
            if(/[^\w\.\/]/ig.test(password)){
                this.$message.warning('密码中不能包含中文和空格！');
                return false;
            }else if(password.length<4||password.length>16){
                this.$message.warning('密码长度小于4位或大于20位');
                return false;
            }else if(!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/.test(password)){
                this.$message.warning('密码至少包含字母/数字/字符两种组合形式');
                return false;
            }else if(password==null){
                this.$message.warning('用户密码不能为空')
                return false;
            }else{
                return true;
            }
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
        .username,.password,.confirm-password{
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
                border: none;
                color: white;
                cursor: pointer;
                border-radius: 12px;
                background:linear-gradient(-200deg,#3197eb,#e6ece5);
                transition: 0.3s;
            }
            .login:hover{
                background:linear-gradient(-200deg,#e6ece5,#3197eb);
                background-position-x: -300px;
            }
            span {
                text-align: center;
                display: inline-block;
                font-size: 16px;
                margin-top: 16px;
            }
            span a{
                color: crimson;
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
