import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from '../views/admin/admin.vue'
import index from '../views/index.vue'
import home from '../views/user/home.vue'
import stockPage from '../views/user/stockPage.vue'
import Article from '@/views/user/article.vue'
import account from '../views/admin/account.vue'
import setting from '../views/admin/setting.vue'
import store from '../store/store'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    children: [
      {
        path: 'root-account',
        component: account
      },
      {
        path: 'root-setting',
        component: setting
      }
    ]
  }, {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: index,
    children: [
      {
        path: 'home',
        component: home
      },
      {
        path: 'article',
        component: Article
      },
      {
        path: 'stock',
        component: stockPage
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

function openMessage (n) {
  switch (n) {
    case 0: {
      Message.error('请先进行登录')
      break
    }
    case 1: {
      Message.error('权限不够,请联系管理员获取权限')
      break
    }
  }
}

router.beforeEach((to, from, next) => {
  const isLogin = store.state.isLogin
  const level = store.state.user.level
  if (to.path === '/admin') {
    if (level === 3 && isLogin) {
      console.log('放行到后台')
      next()
    } else if (isLogin) {
      openMessage(1)
      console.log('等级不够', typeof level)
      next(false)
    } else {
      openMessage(0)
      console.log('未登录')
      next('/home')
    }
  } else {
    next()
  }
})
export default router
