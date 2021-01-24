<template>
    <div>
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
import {getDetail, Goods} from '@/network/detail'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'

export default {
    name: 'Detail',
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
    },
    created(){
        this.iid = this.$route.params.iid

        getDetail(this.iid).then(res => {
            console.log(res);
            //获取轮播图
            this.topImages = res.result.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(res.result.itemInfo, res.result.colunms, res.result.shopInfo.services)
        })
    }
}
</script>

<style>

</style>