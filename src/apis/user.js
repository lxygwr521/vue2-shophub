import httpInstance from "@/utils/http"
export const  LoginApi = ({account,password})=>{
  return httpInstance({
    url:'/login',
    method:'POST',
    data: {
      account,
      password
    }
  })
}