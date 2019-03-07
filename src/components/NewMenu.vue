<template>
    <div class="newmenu">
        <h3 class="text-center text-warning">菜单管理</h3>
        <table class="table text-center">
            <thead>
                <tr>
                    <th scope="col">序号</th>
                    <th scope="col">品种</th>
                    <th scope="col">删除</th>
                </tr>
            </thead>
            <tbody v-for="(item,index) in items" :key="index">
                <tr>
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td><button class="btn btn-danger" @click="del(item)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            // items:[]
        }
    },
    mounted(){
        var that = this;
        axios.get('./menu-wzf.json')
        .then(res=>{
            console.log(res.data)
            //在这里我们需要获取到key值==>存储为id,方便通过id删除当前项
            var menus = [];
            for(var key in res.data){
                console.log(key);
                var item = res.data[key];
                item.id = key;
                // that.items.push(item)
                // 用当前的menu来实现数据的管理
                menus.push(res.data[key])
            }
            console.log(menus)
            // 优势在于通过vuex=>store,直接实现了数据的更新
            that.$store.commit('setMenuItems',menus)
        })
    },
    methods:{
        del(item){
            axios.delete('/menu-wzf/'+item.id+'.json')
            .then(res=>{
                alert('删除成功');
                // this.$router.push('/menu')
                this.$store.commit('deleteMenuItems',item)
                //刷新页面的方法
                // location.reload()
            })
        }
    },
    computed:{
        items(){
            return this.$store.getters.getMenuItems;
        }
    }
}
</script>

<style scoped>

</style>

