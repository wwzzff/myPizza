<template>
    <div class="newpizza">
        <h3 class="text-center text-primary">添加新Pizza</h3>
        <form>
            <div class="form-group">
                <label class="text-primary label1" for="input1">pizza的种类：</label>
                <input type="email" class="form-control" id="input1" placeholder="给这个pizza起个名字吧..." v-model="newPizza.name">
            </div>
            <div class="form-group">
                <label class="text-primary label2" for="input2">pizza的描述：</label>
                <textarea id="input2" cols="82" rows="2" placeholder="请输入商品的相关描述..." v-model="newPizza.description"></textarea>
            </div>
            <h3 class="text-info">尺寸&价格</h3>
            <div id="div1"> 
                <div class="form-group sele mr-5">
                    <b>尺寸：</b>
                    <select class="form-control" v-model="newPizza.size1">
                        <option>5</option>
                        <option>7</option>
                        <option>9</option>
                        <option>11</option>
                        <option>14</option>
                    </select>
                </div>
                <div class="form-group sele" >
                    <b>价格：</b>
                    <input type="text" class="input3" v-model="newPizza.price1"> 
                </div>
            </div>
            <div id="div2"> 
                <div class="form-group sele mr-5">
                    <b>尺寸：</b>
                    <select class="form-control" v-model="newPizza.size2">
                        <option>5</option>
                        <option>7</option>
                        <option>9</option>
                        <option>11</option>
                        <option>14</option>
                    </select>
                </div>
                <div class="form-group sele" >
                    <b>价格：</b>
                    <input type="text" class="input4" v-model="newPizza.price2"> 
                </div>
            </div>
            <button class="btn btn-primary btn-block" @click.prevent="addPizza">添加pizza</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            newPizza:{}
        }
    },
    methods:{
        addPizza(){
            var data = {
                name:this.newPizza.name,
                description:this.newPizza.description,
                options:[
                    {
                        size:this.newPizza.size1,
                        price:this.newPizza.price1
                    },{
                        size:this.newPizza.size2,
                        price:this.newPizza.price2
                    }
                ]
            }
            axios.post('/menu-wzf.json',data)
            .then(res=>{
                console.log(res.data)
                // this.$router.push('/menu')
                this.$store.commit('pushMenuItems',data)
            })
        }
    }
}
</script>

<style scoped>
    .label1,.label2{
        font-size: 20px;
    }
    .sele{
        width:150px;
        float:left;
    }
    .input3,.input4{
        width:150px;
        height: 38px;
    }
    #div1{
        width:500px;
        height:100px;
        /* border:1px solid black; */
    }
</style>
