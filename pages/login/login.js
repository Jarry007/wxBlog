// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
    },

    bindGetUserInfo(e) {
        const accountInfo = wx.getAccountInfoSync()
        console.log(accountInfo.miniProgram.appId)
        console.log(e.detail.userInfo)
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    console.log(res.code)
                    wx.getUserInfo({
                        success: e => {
                            let info = {
                                encryptedData: e.encryptedData,
                                iv: e.iv,
                                code: res.code,
                                appid: accountInfo.miniProgram.appId
                            }
                            wx.request({
                                url: 'http://127.0.0.1:5000/mp/login',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    info: JSON.stringify(info)
                                },
                                method: 'POST',
                                success: function (u) {
                                    wx.setStorageSync('final_data', u.data)
                                    wx.navigateBack({
                                        detal: 1
                                    })
                                },
                                fail: function (f) {
                                    console.log(f)
                                },
                            })
                        },
                        fail: f => {
                            console.log('fail,login_fail')
                            console.log
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