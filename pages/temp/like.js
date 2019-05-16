// pages/index/like.js
const app = getApp()
var router = require('../index/router.js');
var timeago = require('../../utils/timeago.js')
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        like: ''
    },
    onLoad: function(options) {
        let stroage = wx.getStorageSync('final_data')
        console.log(stroage)
        if (stroage) {
            let info = {
                openId: stroage.openId
            };
            router.route_request('mp/my_like', info).catch(res => {
                let data_ = res.all
                for (var i = 0; i < data_.length; i++) {
                    data_[i]['time'] = timeago.transDate(data_[i]['time'].replace('GMT', ''))
                }
                this.setData({
                    like: data_
                })
            })
        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }

    },
    todetail(e) {
        wx.vibrateShort({})
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../index/more?id=' + id,
        })

    },
    onPageScroll(e){
        if (e.scrollTop < 0) {
            wx.pageScrollTo({
                scrollTop: 0
            })
        }
    }


})