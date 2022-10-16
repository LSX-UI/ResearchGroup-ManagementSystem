import Mock from 'mockjs'
export default {
  getMenu: config => {
    console.log(config);
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body),'传递过来的用户名称为');
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    // 获取用户中存储在localStorage中的用户名和密码，如果存在也可以进行跳转0925
    let hadUsername=localStorage.getItem(username);
    let hadUserPassword=localStorage.getItem(`${username}Password`);
    if (username === 'admin' && password === '123456'||(hadUsername===username&&hadUserPassword===password)) {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/index.vue'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/index.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User/index.vue'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'other/PageOne'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'other/PageTwo'
                }
              ]
            }
          ],
          // 使用Mock自带的方法进行随机生成token值
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } 
    else if (username === 'user' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home/index.vue'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/index.vue'
            }
          ],
          // 返回一个token数据信息
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } 
    else {
      return {
        code: -999,
        data: {
          message: '密码错误或用户名错误！'
        }
      }
    }

  }
}
