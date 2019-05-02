// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    login(){
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    wx.getUserInfo({
                        success: e => {
                            let info = {
                                encryptedData: e.encryptedData,
                                iv: e.iv,
                                code: res.code
                            }
                            wx.request({
                                url: 'http://127.0.0.1:5000/mp/login',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    info: JSON.stringify(info) //把object转化为json数据
                                },
                                method: 'POST',
                                success: function (u) {
                                    console.log({ 'openid:': u.data })
                                    wx.setStorageSync('final_data', u.data)
                                    wx.navigateBack({
                                        detal:1
                                    })
                                },
                                fail: function (f) {
                                    console.log(f)
                                },
                            })
                        },
                        fail: function () {
                            console.log('fail,login_fail')
                            wx.showToast({
                                title: '失败',
                            })
                        }
                    })
                }
            }
        })
        wx.checkSession({
            success() {
            },
            fail() {
                wx.login() // 重新登录
            }
        })
    }
})