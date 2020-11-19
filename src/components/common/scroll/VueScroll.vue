<template>
    <vuescroll :ops="ops" ref="scroll">
        <slot></slot>
    </vuescroll>
</template>

<script>
import vuescroll from 'vuescroll';


export default {
    components:{
        vuescroll
    },
    data() {
      return {
        ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {},
          bar: {}
        }
      }
    },
    methods: {
        scrollTo(Object, speed=500){
            console.log(12);
            this.$refs.scroll.scrollTo({
                Object,
                speed,
            })
        }
    },
}
</script>