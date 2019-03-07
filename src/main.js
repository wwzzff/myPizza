// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 引入vuex
import { store } from './store/store'

// 配置axios的请求地址
axios.defaults.baseURL = 'https://wd4109600243wseleu.wilddogio.com/';

Vue.config.productionTip = false

// 全局守卫
// 当我刚进入localhost:8080的时候，让当前的页面跳转到对应的登录注册页
router.beforeEach((to, from, next) => {
    if (sessionStorage.user) { //已登录
        next();
    } else { //未登录状态
        if (to.path == '/login' || to.path == '/register') {
            next()
        } else {
            alert('对不起，你还没有登录，即将跳转到登录界面...');
            next('/login')
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})