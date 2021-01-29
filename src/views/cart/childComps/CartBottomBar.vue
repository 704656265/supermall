<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                :is-checked="isAllChecked" 
                class="check-button"
                @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计: {{ totalPrice }}
        </div>

        <div class="calculate">
            去计算({{ checkLength }})
        </div>
    </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
    name: "CartBottomBar",
    components:{
        CheckButton,
    },
    computed: {
        ...mapGetters(['cartList']),

        totalPrice() {
            return this.cartList.filter(item => {
                return item.checked
            }).reduce((prevalue, item) => {
                return prevalue + item.price * item.count
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => {
                return item.checked
            }).length   
        },
        isAllChecked() {
            if(this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkClick() {
            if(this.isAllChecked){
                this.cartList.forEach(item => {
                    return item.checked = false
                });
            } else {
                this.cartList.forEach(item => item.checked = true)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        width: 100%;
        background: #eee;
        position: relative;
        display: flex;
    }
    .check-content {
        width: 25%;
        display: flex;
        align-items: center;
        margin-left: 10px;
        justify-items: center;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price {
        flex: 1;
        text-align: center;
        justify-content: center;
        line-height: 40px;
    }
    .calculate {
        width: 25%;
        background-color: rgb(241, 142, 142);  
        justify-content: center;
        text-align: center;
        line-height: 40px;
    }
</style>