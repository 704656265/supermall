
import {ADD_COUNT, ADD_TO_CART} from './mutation-types'

export default {
    addCart(context, payload){
        return new Promise((resolve, reject) => {
          let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
          if(oldProduct){
            context.commit(ADD_COUNT, oldProduct)
            resolve('当前商品数量加一')
          } else {
            payload.count = 1
            context.commit(ADD_TO_CART, payload)
            resolve('添加新商品')
          }
        })
      }
}