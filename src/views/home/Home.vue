<template>
    <div id='home'>
        <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
        
        <scroll class="home-scroll" ref="scroll">
            <home-swiper :banners='banners'></home-swiper>
            <home-recommend-view :recommends='recommends'></home-recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control" :titles='["流行","新款","精选"]' @tabclick="tabclick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backclick"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'


export default {
    name:'home',
    components:{    
        NavBar,
        TabControl,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        GoodsList,
        Scroll,
        BackTop,
    },
    data(){
        return{
            banners: [],
            dKeywords:[],
            keywords:[],
            recommends:[],
            goods:{
                'pop': {page:0, list:[]},
                'new': {page:0, list:[]},
                'sell': {page:0, list:[]},
            },
            currentType: 'pop',
        }
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted(){
        //监听图片加载
        this.$bus.$on('itemImageLoad', ()=>{
            this.$refs.scroll.refresh()
        })
    },
    methods: {
        //事件监听相关
        tabclick(index){
            switch(index){
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },
        backclick(){
            console.log(1);
            // console.log(this.$refs["scroll"]);
            this.$refs.scroll.scrollTo(0, 0)
        },




        //网络请求相关
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                this.banners = res.data.banner.list
                this.dKeywords = res.data.dKeyword
                this.keywords = res.data.keyword
                this.recommends = res.data.recommend.list
        })
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res=>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1
            })
        }
    },
}
</script>

<style scoped>
    #home {
        padding-top: 44px;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: white;

        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 9;
    }
    .tab-control{
        position: sticky;
        top: 44px;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 93px);
    }
    .home-scroll{
    /* height:300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>