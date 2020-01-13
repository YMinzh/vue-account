import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Add from '../views/Add.vue'
import CreateAcc from '../views/CreateAcc.vue'
import Detals from '../views/Detals.vue'
import Record from '../views/Record.vue'
import Admin from '../views/Admin.vue'
import ChangeAdmin from '../views/ChangeAdmin.vue'
import ChangePhone from '../views/ChangePhone.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Books from '../views/Books.vue'
import Account from '../views/Account.vue'
import Appened from '../views/Appened.vue'
import Feedback from '../views/Feedback.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import Catchange from '../views/Catchange.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
 
  {
    path: '/create',
    name: 'createAcc',
    component: CreateAcc
  },
  {
    path: '/detals',
    name: 'detals',
    component: Detals
  },
  {
    path: '/record',
    name: 'record',
    component: Record
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/changeadmin',
    name: 'changeadmin',
    component: ChangeAdmin
  },
  {
    path: '/changephone',
    name: 'changephone',
    component: ChangePhone
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: ChangePassword
  },
  {
    path: '/book',
    name: 'book',
    component: Books
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/appened',
    name: 'appened',
    component: Appened
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Feedback
  },
  {
    path: '/forget',
    name: 'forget',
    component: ForgetPassword
  },
  {
    path: '/catchange',
    name: 'catchange',
    component: Catchange
  },

]

const router = new VueRouter({
  routes
})

export default router
