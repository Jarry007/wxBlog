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
        isnew: false
    },
    onLoad: function (options) {
        wx.getSetting({
            success:res=> {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success:res=> {
                            console.log({'res.userinfo':res.userInfo})
                            this.setData({
                                userInfo:res.userInfo,
                                hasUserInfo:true
                            })
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
                            router.route_request('mp/login', info).catch(res => {
                                console.log(res)
                                this.setData({
                                    userInfo:res,
                                    hasUserInfo:true
                                })
                                wx.setStorageSync('final_data', res)
                                wx.navigateBack({
                                    detal: 1
                                })
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
            success() { },
            fail() {
                wx.login() // 重新登录
            }
        })
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShow: function() {
        let stroage = wx.getStorageSync('final_data');
        if (stroage) {
            let info = {
                openId: stroage.openId
            }
            router.route_request('mp/all_notice', info).catch(res => {
                wx.setStorageSync('notice', res)
                console.log()
                if (res.like[0]['new'] || res.reply[0]['new']) {
                    console.log('new')
                    this.setData({
                        isnew: true
                    })
                } else {
                    console.log('old')
                    this.setData({
                        isnew: false
                    })
                }
            })

        }

    },
    CopyLink(e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.link,
            success: res => {
                wx.showToast({
                    title: '已复制',
                    duration: 1000,
                })
            }
        })
    },

})