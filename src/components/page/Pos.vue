<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos-order" ref="order-list" id="order-list">
                <el-tabs type="card">
                    <el-tab-pane label="点餐">
                        <el-table :data="tableData" border show-summary style="width: 100%">
                            <el-table-column prop="goodName" label="商品名称">

                            </el-table-column>
                            <el-table-column prop="count" label="数量">

                            </el-table-column>
                            <el-table-column prop="price" label="金额">

                            </el-table-column>
                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">
                                        删除
                                    </el-button>
                                    <el-button type="text" size="small">
                                        增加
                                    </el-button>
                                </template>
</el-table-column>
</el-table>
<div class="pos-btn">
    <el-button type="primary">
        挂单
    </el-button>
    <el-button type="warning">
        删除
    </el-button>
    <el-button type="success">
        结账
    </el-button>
</div>
</el-tab-pane>
<el-tab-pane label="挂单">
    挂单
</el-tab-pane>
<el-tab-pane label="外卖">
    外卖
</el-tab-pane>
</el-tabs>
</el-col>
<el-col :span="17">
    <div class="common-goods">
        <div class="common-goods-title">常用商品</div>
        <div class="common-goods-list">
            <ul>
                <li v-for="goods in commongoods">
                    <span>{{goods.goodsName}}</span>
                    <span class="common-goods-price">￥{{goods.price}}</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="goods-type">
        <el-tabs type="border-card">
            <el-tab-pane label="汉堡" name="1">
                <ul class="cook-list">
                    <li v-for="food in type0Foods">
                        <span class="food-img"><img :src="food.goodsImg" width="100%" /></span>
                        <span class="food-name">{{food.goodsName}}</span>
                        <price class="food-price">￥{{food.price}}元</price>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="小吃" name="2">
                小吃
            </el-tab-pane>
            <el-tab-pane label="饮料" name="3">
                汉堡
            </el-tab-pane>
            <el-tab-pane label="套餐" name="4">
                汉堡
            </el-tab-pane>
        </el-tabs>
    </div>
</el-col>
</el-row>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'pos',
        created() {
            axios.get('http://jspang.com/DemoApi/oftenGoods.php')
                .then(res => {
                    // eslint-disable-next-line
                    console.log(res);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    console.log(err);
                });
        },
        data() {
            return {
                tableData: [{
                    goodName: '可口可乐',
                    price: 8,
                    count: 1
                }, {

                    goodName: '香辣鸡腿堡',
                    price: 15,
                    count: 1
                }, {

                    goodName: '爱心薯条',
                    price: 8,
                    count: 1
                }, {

                    goodName: '甜筒',
                    price: 8,
                    count: 1
                }],
                commongoods: [],
                type0Foods: [],
                type1Foods: [],
                type2Foods: [],
                type3Foods: []
            };
        },
        mounted: function () {
            // eslint-disable-next-line        
            let self = this;
            let orderHeight = document.body.clientHeight;
            /*
             * 这个地方不能使用 this.$refs['order-list'] 来获取 DOM 节点
             * 因为上面方法获取到的是该子组件~~~，该子组件并没有 style 属性
             */
            let orderList = document.querySelector('#order-list');
            orderList && (orderList.style.height = orderHeight + 'px');
        }
    };

</script>

<style scoped>
    .pos-order {
        background-color: #F9FAFC;
        border-right: 1px solid #CCD;
    }

    .pos-btn {
        margin-top: 10px;
    }

    .common-goods-title {
        height: 20px;
        border-color: 1px solid #dcdce6;
        background-color: #f9fafc;
        padding: 10px;
        text-align: left;
    }

    .common-goods-list ul li {
        list-style: none;
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 10px;
        background-color: white;
    }

    .common-goods-price {
        color: #58b7ff;
    }

    .goods-type {
        clear: both;
    }

    .cook-list li {
        list-style: none;
        width: 23%;
        border: 1px solid #e5e9f2;
        height: auto;
        overflow: hidden;
        background-color: white;
        padding: 2px;
        float: left;
        margin: 2px;
    }

    .cook-list li span {
        display: block;
        float: left;
    }

    .food-img {
        width: 40%;
    }

    .food-name {
        font-size: 18px;
        padding-left: 10px;
        color: brown;
    }

    .food-price {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
    }

</style>
