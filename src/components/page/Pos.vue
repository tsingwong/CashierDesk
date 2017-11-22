<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos-order" ref="order-list" id="order-list">
                <el-tabs>
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
    产品栏
</el-col>
</el-row>
</div>
</template>

<script>
    export default {
        name: 'pos',
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
                }]
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
</style>
