import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export var store = new Vuex.Store({
    // state + getters + mutations + action 都是固定的特有写法
    // menuItems/getMenuItems/setMenuItems等都是自己命名(自定义写法)的
    state: { //状态库/数据源
        //表示当前的菜品数组
        menuItems: [],
        // 当前的用户名
        currentUser: null,
        // 当前的登陆状态
        isLogin: false
    },
    getters: { //派生状态的数据源
        getMenuItems: state => state.menuItems,
        currentUser: state => state.currentUser,
        isLogin: state => state.isLogin
            // isLogin: function(state) {
            //     return state.isLogin
            // }
    },
    mutations: { //更改Vuex中store的状态值
        // 通过set方法实现get请求数据后的更新
        setMenuItems(state, data) {
            state.menuItems = data
        },
        // 通过push方法实现NewPizza页面的post数据让当前数据发生更新
        pushMenuItems(state, data) {
            state.menuItems.push(data);
        },
        // 通过delete方法实现NewMenu页面的删除数据功能
        deleteMenuItems(state, data) {
            state.menuItems.forEach((item, index) => {
                if (item == data) {
                    state.menuItems.splice(index, 1)
                }
            })
        },
        UserStatus(state, data) {
            if (data) {
                state.currentUser = data;
                state.isLogin = true;
            } else {
                state.currentUser = null;
                state.isLogin = false;
            }
        }
    },
    actions: { //触发多个state的操作，使用mutations会触发时更好的维护 --------但是如果mutations过多就需要action来触发了
        setUser({ commit }, user) {
            commit('UserStatus', user)
        }
    }
})