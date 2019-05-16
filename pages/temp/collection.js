var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
const app = getApp()
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        collection:''
    },
    onLoad: function (options) {
        let collec = wx.getStorageSync('collection');
        console.log(collec)
        this.setData({
            collection:collec
        })

    },
    onReady: function () {

    },
    todetail(e){
        wx.vibrateShort({})
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../index/more?id=' + id,
        })
    },
    onPageScroll(e) {
        if (e.scrollTop < 0){
            wx.pageScrollTo({
                scrollTop: 0,
                duration:300
            })
        }
    }
  
})