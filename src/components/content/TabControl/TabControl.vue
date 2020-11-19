<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" class="tab-control-item" :class="{active: index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        titles:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0,
        }
    },
    methods: {
        itemClick(index){
            this.currentIndex = index
            this.$emit('tabclick', index)
        }
    },

}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
    }

    .tab-control-item{
        flex: 1;
    }
    .active{
        color: pink;
    }
    .active span{
        border-bottom: 2px solid;
    }
</style>