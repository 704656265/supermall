<template>
    <div class="toast"  v-show="isShow">
        <div>{{ message }}</div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    // props: {
    //     message: {
    //         type: String,
    //         default: ""
    //     },
    //     show: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            message: "",
            isShow: false
        }
    },
    methods: {
        show(mes, time=1000){
            this.isShow = true
            this.message = mes

            setTimeout(() => {
                this.isShow = false
                this.message = ""
            }, time);           
        }
    }
}
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 8px 15px;
        z-index: 1000;
    }
</style>