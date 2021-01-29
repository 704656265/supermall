<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backclick">
                <img src="@/assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(title, index) in titles" class="title-item" @click="titleclick(index)" :class="{active: index === currentIndex}">
                    {{title}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data(){
        return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0,
        }
    },
    methods:{
        titleclick(index){
            this.currentIndex = index
            this.$emit('navbarClick', index)
        },
        backclick(){
            this.$router.back()
        }
    }
}
</script>

<style>
    .title{
        display: flex;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: pink;
    }
    .back img{
        margin-top: 10px;
    }
</style>