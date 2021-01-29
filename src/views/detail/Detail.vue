<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @navbarClick="navbarClick"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comments"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backclick"></back-top>
        <toast :message="message" :show="show"></toast>
    </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
import {getDetail, Goods, Shop, GoodsParams, getRecommend} from '@/network/detail'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
import DetailImagesInfo from '@/views/detail/childComps/DetailImagesInfo'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'
import Toast from '@/components/common/toast/Toast'

import Scroll from '@/components/common/scroll/Scroll'

import GoodsList from '@/components/content/goods/GoodsList'
import { backTopMixin } from '@/common/mixin'
import { mapActions } from 'vuex'

export default {
    name: 'Detail',
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            message: "",
            show: false,
        }
    },
    mixins: [backTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailImagesInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        Toast,
    },
    created(){
        this.iid = this.$route.params.iid
        //请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result
            //获取轮播图
            this.topImages = data.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.colunms, data.shopInfo.services)

            //店铺信息
            this.shop = new Shop(data.shopInfo)

            //图片信息
            this.detailInfo = data.detailInfo

            //参数信息
            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

            //评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }

        })
        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })
    },
    mounted() {

    },
    methods: {
        ...mapActions(['addCart']),
        imgLoad() {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            this.$refs.scroll.refresh()
        },
        navbarClick(index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
        },
        addToCart(){
            //购物车需要的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            //将商品加入购物车
            this.addCart(product).then(res => {
                this.$toast.show(res, 1500)
                console.log(this.$toast);
            })

            
            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res);
            // })
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
        overflow: hidden;
    }
</style>