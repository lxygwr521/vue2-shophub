 //把components中的所有组件都进行全局化注册
 //通过插件的方式
 import Sku from './XtxSku/index.vue'
 import ImageView from './ImageView.vue'
 export const componentPlugin = {
    install(app){
      app.component('XtxSku',Sku)
      app.component('XtxImageView',ImageView)
    }
 }