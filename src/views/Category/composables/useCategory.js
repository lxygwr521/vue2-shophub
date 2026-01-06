//封装分类数据相关代码
import { onMounted } from 'vue'
import {getCategoryAPI} from '@/apis/category'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory(){
  const categoryData = ref({})
  const route = useRoute()
  const getCategory =  async (id = route.params.id)=>{
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
    // console.log(res.result);
    
  }
  onMounted(getCategory)
  onBeforeRouteUpdate((to) => {
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })

  return{
    categoryData
  }

}
