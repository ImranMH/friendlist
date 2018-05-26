import Vue from 'vue'
import VueRouter from 'vue-router'

import Todos from './components/todo.vue'
import User from './components/user/User.vue'
import NewUser from './components/user/NewUser.vue'
import SingleUser from './components/user/SingleUser.vue'
import Login from './components/login/index.vue'
import Signup from './components/login/signup.vue'
import { auth } from './firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Todos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      requiresAuth: true
    }
  },
    {
    path: '/user/new',
    component: NewUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    component: SingleUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]
const router = new VueRouter({
  routes
})

/* route guard */
router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser){
    next({
      path:'login'
    })
  } else{
 
    next()
  }
});

export default router