import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export var store = new Vuex.Store({
    // state + getters + mutations + action 都是固定的特有写法
    // menuItems/getMenuItems/setMenuItems等都是自己命名(自定义写法)的
    state: { //状态库/数据源


    },
    getters: { //派生状态的数据源

    },
    mutations: { //更改Vuex中store的状态值

    },
    action: { //触发多个state的操作，使用mutations会触发时更好的维护

    }
})