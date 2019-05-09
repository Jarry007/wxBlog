// pages/index/flash.js
const app = getApp()
var router = require('../index/router.js')
var timeago = require('../../utils/timeago.js')
Page({

    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        notice: '',
        TabCur: 0,
        scrollLeft:0,
        page: 1,
        tab2: false,
        route: 'mp/notice',
        reply:'',
        like:''

    },
    tabselect(e){
        let id = e.currentTarget.dataset.id;
        if (id==0){
            var route = 'mp/notice'
        }else{
            var route = 'mp/notice_reply';
        }
        let stroage = wx.getStorageSync('final_data');
        let info = {
            openId: stroage.openId,
            page: 1
        };
        this.pagenation(route, info)
        this.setData({
            TabCur: id,
            scrollLeft: (id - 1) * 60,
            route:route,
            page:1
        })
    },
    onLoad: function(options) {
        let stroage = wx.getStorageSync('final_data'),
            route = this.data.route,
            page = this.data.page;
        if (stroage) {
            let info = {
                openId: stroage.openId,
                page: page
            };
            this.pagenation(route, info)
        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },

    pagenation(route, info) {
        router.route_request(route, info).catch(res => {
            var data_ = res.all;
              let page = this.data.page
                let notice = this.data.notice;
                console.log(data_)
                for(var i =0;i<data_.length;i++){
                    data_[i]['time'] = timeago.transDate(data_[i]['time'].replace('GMT', ''))
                }
                if (page == 1) {
                    if (data_.length == 0) {
                        wx.showToast({
                            title: '加载完毕',
                            icon: 'none'
                        })
                    }
                    this.setData({
                        notice: data_
                    })
                } else {
                    if (data_.length == 0){
                        wx.showToast({
                            title: '加载完毕',
                            icon:'none'
                        })
                    }
                    this.setData({
                        notice: notice.concat(data_)
                    })
                }
    })
},
    onReachBottom: function() {
        wx.showLoading({
            title: '数据加载中...',
            icon: 'loading',
            duration: 1000
        })
        let page = this.data.page + 1,
            route = this.data.route,
            stroage = wx.getStorageSync('final_data');
        this.setData({
            page: page
        })
        let info = {
            openId: stroage.openId,
            page: page
        }
        this.pagenation(route,info)
        
    }
})