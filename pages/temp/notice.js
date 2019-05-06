// pages/temp/notice.js
const app = getApp()
var router = require('../index/router.js')
Page({
    data: {
        notice:''
    },
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
})