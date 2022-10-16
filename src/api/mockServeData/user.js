import Mock from 'mockjs';
// 用户管理所涉及到的数据内容操作比较复杂，需要进一步的深入学习了解mock，以达到前端独立开发的条件
// get请求方式从config.url中获取参数，post从config.body中获取相应的参数
function param2Obj(url){
    const search=url.split('?')[1];
    if(!search){
        return {}
    }
    return JSON.parse(
       '{"'+
         decodeURIComponent(search)
         .replace(/"/g,'\\"')
         .replace(/&/g,'","')
         .replace(/=/g,'":"')+
       '"}'
    )
}
let List=[]
let count=200;
// 通过for循环调用Mock.mock()函数生成多个用户信息的模拟数据
for(let i=0;i<count;i++){
    List.push(
        Mock.mock({
            id:Mock.Random.guid(),
            userName:Mock.Random.cname(),
            address:Mock.mock('@county(true)'),
            'userAge|18-99':1,
            birthday:Mock.Random.date(),
            sex:Mock.Random.integer(0,1),
        })
    )
}
// 打印测试生成的用户数据
// console.log('Mock生成的用户数据为',List)
export default{
/**
 * 获取用户列表清单
 * @params name,page,limit；name可以不填，page,limit有默认值。
 * @return {{code:number,count:number,data:*[]}}
 */
// ! 获取用户列别的方法，依据不同的请求方式
getUserList:config=>{
    const {name,page=1,limit=20}=param2Obj(config.url);
    //console.log('name:'+name,'page'+page,'分页大小limit'+limit);
    const mockList=List.filter(user=>{
        // ! 自定义的属性名在调用构造函数身上的方法时要注意是否一致
        if(name && user.userName.indexOf(name)===-1&& user.address.indexOf(name===-1)) return false;
        return true;
    })
    // 过滤获取当前页面所有的用户数目
    const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1));
    return {
        code:20000,
        count:mockList.length,
        list:pageList
    }
  },
/**
 * 增加一个用户
 * @params userName,address,userAge,birthday,sex
 * @return {{code:number,data:{message:string}}}
 * 拦截方法设置成箭头函数的形式，更有利于传入相关的配置项
 */
createUser:config=>{
    const {userName,address,userAge,birthday,sex}=JSON.parse(config.body)
    //console.log(JSON.parse(config.body));
    List.unshift({
        id:Mock.Random.guid(),
        userName:userName,
        address:address,
        userAge:userAge,
        birthday:birthday,
        sex:sex
    })
    return {
        code:20000,
        data:{
            message:'添加成功'
        }
    }

},

/**
 * 编辑一个用户updateUser
 * 
 */
updateUser:config=>{
    // 从拦截到的body里面进行解构赋值
    const {id,userName,address,userAge,birthday,sex}=JSON.parse(config.body)
    const sex_num=parseInt(sex);
    
    // 对存储数据的数组进行过滤操作
    List.some(person=>{
        if(person.id=id){
            person.userName=userName
            person.address=address
            person.userAge=userAge
            person.birthday=birthday
            person.sex=sex_num
            return true
        }
    })
    return {
        code:20000,
        data:{
            message:'编辑成功'
        }
    }
},

/**
 * @params{{id}}
 * 根据用户传递过来的id进行删除操作。
 */
 deleteUser:config=>{
    const requestData=JSON.parse(config.body);
    const id=requestData.params.id;
    if(!id){
        return {
            code:-999,
            message:'参数不正确'
        }
    }else{
        //! 使用数组方法过滤掉传过来的用户id值
        List = List.filter(u => u.id !== id);
        return {
            code:20000,
            message:'删除成功'
        }
    }
 }
}
