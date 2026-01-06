import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart',()=>{
  const userStore = useUserStore()
    const cartList = ref([])
    const allCount = computed(()=>
      cartList.value.reduce((start,c)=>start+c.count,0))
    const allPrice = computed(()=>
          cartList.value.reduce((start,c)=>start+c.count*c.price,0))
    const isLogin = computed( () => userStore.userInfo.token)
    const updateNewList = async ()=>{
      const res = await findNewCartListAPI()
          cartList.value = res.result

    }
    const changeList = async (goods)=>{
      const { skuId, count } = goods
      // 登录
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
          const item = cartList.value.find((item)=>{goods.skuId===item.skuId})
          if(item){
            item.count++
          }else{
            cartList.value.push(goods)
          }
        }
       //
    }
    const del = async(skuId)=>{
      if (isLogin.value) {
        // 调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId])
        updateNewList()
      } else {
        const idx = cartList.value.findIndex( (item) => {item.skuId===skuId})
        cartList.value.splice(idx,1)
       }
    }
    const singleCheck = (selected,skuId)=>{
      const goods = cartList.value.find((item)=>{item.skuId===skuId})
      goods.selected = selected
    }
    // 全选功能action
    const allCheck = (selected) => {
   // 把cartList中的每一项的selected都设置为当前的全选框状态
       cartList.value.forEach(item => item.selected = selected)
    }
    const clearCart = () => {
      cartList.value = []
    }

// 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 3. 已选择数量
const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
// 4. 已选择商品价钱合计
const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  
return {cartList,changeList,del,updateNewList,
      allCount,allPrice,singleCheck,allCheck,isAll,
      selectedCount,selectedPrice,clearCart},{
      persist:true
    }

})