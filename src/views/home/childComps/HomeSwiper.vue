<template>
    <div class="block">
        <span class="demonstration"></span>
        <el-carousel height="250px">
            <el-carousel-item v-for="item in banners">
                <a class="small" :href="item.link">
                    <img :src="item.image" alt="" height="100%">
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name:'homeswiper',
    components:{

    },
    props:{
        banners:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

