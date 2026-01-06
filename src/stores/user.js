import { defineStore } from "pinia";
import { LoginApi } from "@/apis/user";
import { mergeCartAPI } from "@/apis/cart";
import { ref } from "vue";
import { useCartStore } from './cart'
export const useUserStore = defineStore('user',()=>{
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({account,password})=>{
   const res = await LoginApi({account,password})
   userInfo.value = res.result 
   await mergeCartAPI((cartStore.cartList).map((item)=>{
    return {
      skuId: item.skuId,
      selected: item.selected,
      count: item.count}
  }))
  cartStore.updateNewList()

  }
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }

},{persist:true
  
})