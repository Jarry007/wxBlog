const app = getApp();
Component({
   /**
    * 组件的一些选项
    */
   options: {
      addGlobalClass: true,
      multipleSlots: true
   },
   /**
    * 组件的对外属性
    */
   properties: {
      bgColor: {
         type: String,
         default: ''
      },
      isCustom: {
         type: [Boolean, String],
         default: false
      },
      isBack: {
         type: [Boolean, String],
         default: false
      },
      bgImage: {
         type: String,
         default: ''
      },
   },
   /**
    * 组件的初始数据
    */
   attached() {
      //   console.log(app.sysCallBack)
      //   if (app.globalData.barInfo.Custom){
      //      this.setData({
      //         StatusBar: app.globalData.barInfo.StatusBar,
      //         CustomBar: app.globalData.barInfo.CustomBar,
      //         Custom: app.globalData.barInfo.Custom
      //      })
      //   }else{
      //      console.log('callbackkkkkk')
      //      app.sysCallBack = e=>{
      //         console.log('e',e)
      //         this.setData({
      //            StatusBar: e.statusBarHeight,
      //            CustomBar: custom.bottom + custom.top - e.statusBarHeight,
      //            Custom: custom
      //         })
      //      }
      //   }

      wx.getSystemInfo({

         success: e => {
            let custom = wx.getMenuButtonBoundingClientRect();

            //  this.globalData.barInfo.StatusBar = e.statusBarHeight;

            //  this.globalData.barInfo.Custom = custom;
            //  this.globalData.barInfo.CustomBar = custom.bottom + custom.top - e.statusBarHeight;


            this.setData({
               StatusBar: e.statusBarHeight,
               Custom: custom,
               CustomBar: custom.bottom + custom.top - e.statusBarHeight
            })

         }
      })
   },
   data: {
      StatusBar: '',
      CustomBar: '',
      Custom: ''
   },
   /**
    * 组件的方法列表
    */
   methods: {
      BackPage() {
         wx.navigateBack({
            delta: 1
         });
      },
      toHome() {
         wx.reLaunch({
            url: '/pages/index/index',
         })
      }
   }
})