// pages/temp/notice.js
const app = getApp()
var router = require('../index/router.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        notice:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let stroage = wx.getStorageSync('final_data')
        console.log(stroage)
        if (stroage) {
            let info = {
                openId: stroage.openId
            };
            router.route_request('mp/notice', info).catch(res => {
                console.log(res)
                this.setData({
                    notice: res.all
                })
            })
        }
        else {
            wx.navigateTo({
                url: '../login/login',
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

   
})