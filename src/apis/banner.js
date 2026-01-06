import  httpInstance  from '@/utils/http'
export function getBannerAPI (params={}){
  const { distributionSite = '1' } = params //解构赋值
  return httpInstance({
    url:'home/banner',
    params:{
      distributionSite
    }
  })
}