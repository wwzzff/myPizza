<template>
    <div class="menu container row">
        <!-- 左菜单栏 -->
      <div class="col-7">
          <h3 class="text-center text-primary">点 餐</h3>
          <table class="table text-center">
            <thead class="bg-primary text-white">
                <tr>
                    <th scope="col">尺寸</th>
                    <th scope="col">价格(元)</th>
                    <th scope="col">加入</th>
                </tr>
            </thead>
            <tbody v-for="(item,index) in items" :key="index">
                <tr>
                    <td colspan="3">{{item.name}}</td>
                </tr>
                <tr>
                    <td colspan="3">{{item.description}}</td>
                </tr>
                <tr v-for="(item1,index1) in item.options" :key="index1">
                    <td>{{item1.size}}</td>
                    <td>{{item1.price}}</td>
                    <td>
                        <button class="btn btn-success" @click="addToBasket(item,item1)">+</button>
                    </td>
                </tr>
            </tbody>
          </table>
      </div> 
      <!-- 右购物车 -->
       <div class="col-5">
            <!-- 商品的数量 + 种类 +价格  -->
           <h3 class="text-center text-primary">购物车</h3>
          <table class="table text-center">
            <thead class="bg-primary text-white">
                <tr>
                    <th scope="col">数量</th>
                    <th scope="col">种类</th>
                    <th scope="col">价格(元)</th>
                </tr>
            </thead>
            <template v-if="newItems.length>0">
            <tbody v-for="(item,index) in newItems" :key="index">
                <tr>
                    <td>
                        <button class="btn btn-info btn1" @click="reduce(item,index)" >-</button>
                        <input class="inp" type="number" v-model.number="item.quantity">
                        <button class="btn btn-info btn1" @click="add(item)">+</button>
                    </td>
                    <td>{{item.name}}-{{item.size}} </td>
                    <td>{{item.price*item.quantity}}</td>
                </tr>
            </tbody>
            <tfoot>
            <!-- 计算总数+总价 -->
            <tr>
                <td></td>
                <td colspan="2" class="text-primary">
                    商品总件数：<b>{{toNum}}</b>
                </td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2" class="text-primary">
                    商品总价格：<b>{{toPrice}}</b>
                </td>
            </tr>
            </tfoot>
            </template>
            <template v-else>
                <tr>
                    <td colspan="3">
                        <h3 class="text-center text-info pt-3"> 您的购物车空空如也~</h3>
                    </td>
                </tr>
               
            </template>
          </table>
       </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Menu',
    data(){
        return {
            // items:{},
            // items:{
            //     0:{
            //         name:'芝士pizza',
            //         description:'这是一款广受欢迎的经典口味',
            //         options:[
            //             {size:'7寸',price:'70'},
            //             {size:'10寸',price:'100'}
            //         ]
            //     },
            //     1:{
            //         name:'榴莲pizza',
            //         description:'这是一款口味独特的pizza,依据客人口味自行购买.',
            //         options:[
            //             {size:'7寸',price:'90'},
            //             {size:'10寸',price:'120'}
            //         ]
            //     }
            // },
            //表示在左边菜单栏添加数据，newItems才有数据
            newItems:[]
        }
    },
    mounted(){
        axios.get('./menu-wzf.json')
        .then(res=>{
            // this.items = res.data;
            this.$store.commit('setMenuItems',res.data)
        })
    },
    methods:{
        addToBasket(item,item1){
            // item指的是items里的每一项
            // item1指的是options里的每一项
            //点击添加时实现去重
            // 当前展示的这一项与我们输出的一项吻合时，实现quantity+1
            var result = this.newItems.filter((item2)=>{
                // item2遍历的（指的是newItem里的每一项）
                // item.name('芝士pizza')==item2.name('芝士pizza')
                return item.name==item2.name && item1.size == item2.size
            })

            if(result!=null && result.length>0){
                if(result[0].quantity>=10){
                    result[0].quantity=10;
                }else{
                    result[0].quantity++
                }
            }else{
                this.newItems.push({
                    name:item.name,
                    size:item1.size, 
                    quantity:1,
                    price:item1.price
                })
            }
        },
        reduce(item,index){
            if(item.quantity>1){
                item.quantity--
            }else{
                this.newItems.splice(index,1)
            }
        },
        add(item){
            if(item.quantity>=10){
                item.quantity=10;
            }else{
                item.quantity++
            }
        }
    },
    computed:{
        toNum(){
            return this.newItems.length;
        },
        toPrice(){
            return this.newItems.reduce((pre,cur)=>{
                return pre+cur.quantity*cur.price
            },0)
        },
        items(){
            return this.$store.getters.getMenuItems
        }
    }
}
</script>

<style scoped>
.inp{
    width:50px;
    text-align: center;
}
.btn1{
    width:30px;
    height:30px;
    padding: 0;
}
</style>
