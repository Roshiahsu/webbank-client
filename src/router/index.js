import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/users/addNew',
    name: '註冊',
    component: () => import('../views/UserAddNewView.vue')
  },
  {
    path: '/test',
    name: '測試',
    component: () => import('../views/TestView.vue')
  },
  {
    path: '/users',
    name: 'home',
    component:HomeView,
    redirect:'/users/transactionInfo',
    children:[
      {
        path: '/users/deposit',
        name: '存款',
        component: () => import('../views/DepositView.vue')
      },
      {
        path: '/users/cashOut',
        name: '取款',
        component: () => import('../views/CashOutView.vue')
      },
      {
        path: '/users/transactionInfo',
        name: '交易列表',
        component: () => import('../views/TransactionInfoView.vue')
      },
      {
        path: '/users/passwordUpdate',
        name: '修改密碼',
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
