const app = getApp()
var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
var md_ = require('../../utils/md5.js')
Page({

    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        comments:'',
        replies:''

    },
    onLoad: function (options) {
            let comments = wx.getStorageSync('comment');
            this.setData({
                comments: comments
            })

    },

    onReady: function() {

    },
    reply(e){
        if (e.detail.value.reply) {
            let stroage = wx.getStorageSync('final_data')
            if (stroage) {
                let num = this.data.comments.id,
                    wx_reply = e.detail.value.reply,
                    info = {
                        openId: stroage.openId,
                        wx_reply: wx_reply,
                        num: num
                    };
                var wx_uid = md_.md5(stroage['openId']);
                router.route_request('mp/reply', info).catch(res => {
                    this.setData({
                        comments:res
                    })
                })
            } else {
                wx.navigateTo({
                    url: '../login/login',
                })
            }
        } else {
            wx.showToast({
                title: '输入不能为空',
                icon: 'none'
            })
        }
    }

})