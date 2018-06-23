import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/home/Home.vue'
import Profile from './components/home/Profile.vue'
import EditProfile from './components/home/EditProfile.vue'
import User from './components/user/User.vue'
import NewUser from './components/user/NewUser.vue'
import FriendbyType from './components/user/FriendbyType.vue'
import SingleUser from './components/user/SingleUser.vue'
import EditUser from './components/user/EditUser.vue'
import Login from './components/login/index.vue'
import Signup from './components/login/signup.vue'
import About from './components/utilities/about.vue'
import Contact from './components/utilities/contact.vue'
import Privacy from './components/utilities/privacy.vue'

import { auth } from './firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home/:ProfileId',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home/:ProfileId/edit',
    name: 'editProfile',
    component: EditProfile,
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
    path: '/users/:type',
    component: FriendbyType,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id/edit',
    component: EditUser,
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
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    }
]
const router = new VueRouter({
  routes,
})

/* route guard */
router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser){
    next({
      path:'/login'
    })
  } else{
 
    next()
  }
});

export default router