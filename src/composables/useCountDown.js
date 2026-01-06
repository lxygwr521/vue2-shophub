import dayjs from "dayjs";
import {ref,computed, onUnmounted} from 'vue'
export const useCountDown = ()=>{
  const time = ref()
  let timer = null
  //格式化时间为 xx分xx秒 利用dayjs包
  const formatTime = computed(()=>dayjs.unix(time.value).format("mm分mm秒"))
  const start = (currentTime)=>{
        time.value = currentTime
        timer=setInterval(()=>{
            time.value--    
        },1000)
  }
  onUnmounted(()=>{
      timer&&clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}