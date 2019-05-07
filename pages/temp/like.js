// pages/index/like.js
const app = getApp()
var router = require('../index/router.js')
Page({

 
  data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      like:''

  },
    onLoad: function (options) {
        let stroage = wx.getStorageSync('final_data')
        console.log(stroage)
        if (stroage) {
            let info = {
                openId: stroage.openId
            };
            router.route_request('mp/my_like',info).catch(res=>{
                this.setData({
                    like:res.all
                })
            })
        }
        else {
            wx.navigateTo({
                url: '../login/login',
            })
        }

    },
    todetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../index/more?id='+id,
        })

    }


})