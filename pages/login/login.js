var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        canIUse: wx.canIUse('button.open-type.getUserInfo')

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
        wx.vibrateShort({})
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
                            router.route_request('mp/login', info).catch(res=>{
                                console.log()
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
            success() {},
            fail() {
                wx.login() // 重新登录
            }
        })
    },
    onPageScroll(e) {
        if (e.scrollTop < 0) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
        }
    }
})