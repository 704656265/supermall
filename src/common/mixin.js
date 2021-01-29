import BackTop from 'components/content/backtop/BackTop'


export const backTopMixin = {
    components: {
        BackTop
    },
    methods: {
        backclick(){
            this.$refs.scroll.scrollTo(0, 0)
        },
    },
}