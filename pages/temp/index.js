//index.js
//获取应用实例
const app = getApp()
var router = require('../index/router.js')
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'blogai.cn',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isnew:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
      let stroage = wx.getStorageSync('final_data');
      if (stroage){
          let info = {
              openId: stroage.openId
          }
          router.route_request('mp/all_notice', info).catch(res=>{
              wx.setStorageSync('notice', res)
              if (res.like[0]['new'] || res.like[0]['new'] ){
                  console.log('new')
                  this.setData({
                      isnew:true
                  })
              }else{
                  console.log('old')
                  this.setData({
                      isnew:false
                  })
              }
          })

      }

  }

})
