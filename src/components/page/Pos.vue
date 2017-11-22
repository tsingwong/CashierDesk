<template>
    <div class="pos">
        <el-row>
            <el-col :span="7" class="pos-order" ref="order-list" id="order-list">
                订单栏
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
        border-right: 1px solid  #CCD;

    }
</style>

