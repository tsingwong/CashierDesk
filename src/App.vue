<template>
    <div id="app">
        <leftNav></leftNav>
        <div class="main">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import leftNav from './components/common/leftNav.vue';
    export default {
        name: 'app',
        components: {
            leftNav
        },
    };

</script>

<style>
    #app {
        font-family: 'HanziPen SC','Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .main {
        float: left;
        width:95%;
        background-color: #EFF2F7;
        height: 100%;
        overflow: hidden;
    }
</style>
