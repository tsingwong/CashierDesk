<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos-order" ref="order-list" id="order-list">
                <el-tabs type="card">
                    <el-tab-pane label="点餐">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="goodName" label="商品名称">

                            </el-table-column>
                            <el-table-column prop="count" label="数量">

                            </el-table-column>
                            <el-table-column prop="price" label="金额">

                            </el-table-column>
                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGood(scope.row)">
                                        删除
                                    </el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">
                                        增加
                                    </el-button>
                                </template>
</el-table-column>
</el-table>
<div class="total"><span>数量：<small></small>{{totalCount}}</span> <span><small>金额：</small>{{totalMoney}}元</span></div>
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
                <li v-for="goods in commongoods" @click="addOrderList(goods)">
                    <span>{{goods.goodsName}}</span>
                    <span class="common-goods-price">￥{{goods.price}}</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="goods-type">
        <el-tabs type="border-card" value="1">
            <el-tab-pane label="汉堡" name="1">
                <ul class="cook-list">
                    <li v-for="food in type0Foods" @click="addOrderList(food)">
                        <span class="food-img"><img :src="food.goodsImg" width="100%" /></span>
                        <span class="food-name">{{food.goodsName}}</span>
                        <span class="food-price">￥{{food.price}}元</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="小吃" name="2">
                <ul class="cook-list">
                    <li v-for="food in type1Foods" @click="addOrderList(food)">
                        <span class="food-img"><img :src="food.goodsImg" width="100%" /></span>
                        <span class="food-name">{{food.goodsName}}</span>
                        <span class="food-price">￥{{food.price}}元</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料" name="3">
                <ul class="cook-list">
                    <li v-for="food in type2Foods" @click="addOrderList(food)">
                        <span class="food-img"><img :src="food.goodsImg" width="100%" /></span>
                        <span class="food-name">{{food.goodsName}}</span>
                        <span class="food-price">￥{{food.price}}元</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐" name="4">
                <ul class="cook-list">
                    <li v-for="food in type3Foods" @click="addOrderList(food)">
                        <span class="food-img"><img :src="food.goodsImg" width="100%" /></span>
                        <span class="food-name">{{food.goodsName}}</span>
                        <span class="food-price">￥{{food.price}}元</span>
                    </li>
                </ul>
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
            axios.get('http://localhost:8083/commongoods')
                .then(res => {
                    this.commongoods = res.data;
                })
                // eslint-disable-next-line
                .catch(err => {
                    alert('NetWork Error');
                });
            axios.get('http://localhost:8083/typeGoods')
                .then(res => {
                    this.type0Foods = res.data[0];
                    this.type1Foods = res.data[1];
                    this.type2Foods = res.data[2];
                    this.type3Foods = res.data[3];
                })
                // eslint-disable-next-line
                .catch(err => {
                    alert('NetWork Error');
                });
        },
        data() {
            return {
                tableData: [],
                commongoods: [],
                type0Foods: [],
                type1Foods: [],
                type2Foods: [],
                type3Foods: [],
                totalCount: 0,
                totalMoney: 0,
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
        },
        methods: {
            addOrderList(goods) {
                // 商品是否存在于订单列表中，
                // 无，新增。有，则数量 +1
                let isHave = false;
                for (let i of this.tableData) {
                    i.goodsId === goods.goodsId && (isHave = true);
                }

                if (isHave) {
                    this.tableData.filter(o => {
                        o.goodsId === goods.goodsId && o.count++;
                    });
                } else {
                    let newGoods = {
                        goodsId: goods.goodsId,
                        goodName: goods.goodsName,
                        price: goods.price,
                        count: 1
                    };
                    // let newGoods;
                    // {newGoods.goodsId, newGoods.goodName: goodsName, newGoods.price} = goods;
                    // newGood.count = 1;
                    this.tableData.push(newGoods);
                }
                this.total();
            },
            delSingleGood (goods) {
                const index = this.tableData.indexOf(goods);
                goods.count -= 1;
                goods.count === 0
                && index > -1
                && this.tableData.splice(index, 1);
                this.total();
            },
            total () {
                this.totalCount = 0;
                this.totalMoney = 0;
                this.tableData.length
                && this.tableData.forEach((element) => {
                    this.totalCount += element.count;
                    this.totalMoney += element.count * element.price;
                });
            }   
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
        cursor: pointer;
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
        cursor: pointer;
    }

    .cook-list li span {
        display: block;
        float: left;
    }

    .food-img {
        width: 40%;
    }

    .food-name {
        font-size: 16px;
        padding-left: 10px;
        color: brown;
    }

    .food-price {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
    }
    .total {
        text-align: left;
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #D3dce6;
    }
    .total span {
        margin-left: 10px;
    }
</style>
