<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'


export default {
    data(){
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            mouseWheel: true,
            bounce: false,
        })
        this.scroll.on('scroll', (position)=>{
            this.$emit('scroll', position)
        })
    },
    methods: {
        scrollTo(x, y, time=300){
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>


<style scoped>

</style>