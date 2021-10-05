import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import AppYourFeed from '@/views/YourFeed.vue'
import AppTagFeed from '@/views/TagFeed.vue'
import AppArticle from '@/views/Article.vue'
import AppCreateArticle from '@/views/CreateArticle.vue'
import AppEditArticle from '@/views/EditArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: AppYourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: AppTagFeed,
  },
  {
    path: '/articles/new',
    name: 'CreateArticle',
    component: AppCreateArticle,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: AppArticle,
  },
  {
    path: '/articles/:slug/edit',
    name: 'EditArticle',
    component: AppEditArticle,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
