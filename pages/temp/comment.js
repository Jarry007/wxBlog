// pages/temp/comment.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        comment:''

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
            wx.request({
                url: 'http://127.0.0.1:5000/mp/my_say',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    info: JSON.stringify(info) //把object转化为json数据
                },
                method: 'POST',
                success: e => {
                    console.log(e)
                    this.setData({
                        comment:e.data.all
                    })
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1000
                    })
                },
                fail: err => {
                    wx.showToast({
                        title: '失败',
                        icon: 'fail',
                        duration: 1000
                    })
                
                }
        })
        }
        else{
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

})