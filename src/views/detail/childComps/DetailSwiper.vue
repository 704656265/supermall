<template>
    <div>
        <span class="demonstration"></span>
        <el-carousel height="300px">
            <el-carousel-item v-for="item in topImages">
                    <img :src="item" alt="" height="100%" width="100%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:{
        topImages:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>