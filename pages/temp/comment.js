// pages/temp/comment.js
var app = getApp()
var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
var md_ = require('../../utils/md5.js');
var timeago = require('../../utils/timeago.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        comment: '',
        page:1,
        TabCur: 0,
        scrollLeft: 0,

    },
    onLoad: function(options) {
        let stroage = wx.getStorageSync('final_data')
        console.log(stroage)
        if (stroage) {
            let info = {
                openId: stroage.openId,
                page:this.data.page
            };
            router.route_request('mp/my_say',info).catch(res=>{
                let comment = res.all;
                for (var i = 0; i < comment.length; i++) {
                    comment[i]['time'] = timeago.transDate(comment[i]['time'].replace('GMT', ''))
                }
                this.setData({
                    comment:comment
                })
            })
        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }

    },
    onReady: function() {

    },
    // ListTouch触摸开始
    ListTouchStart(e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            })
        } else {
            this.setData({
                modalName: null
            })
        }
        this.setData({
            ListTouchDirection: null
        })
    },
    onReachBottom: function () {
        wx.showLoading({
            title: '数据加载中...',
            icon: 'loading',
            duration: 1000
        })
        let page = this.data.page + 1,
             stroage = wx.getStorageSync('final_data'),
            comment = this.data.comment,
            info = {
                openId: stroage.openId,
                page: page
            }
        console.log('page' + page)
        router.route_request('mp/my_say', info).catch(res => {
            let data_ = res.all;
            for (var i = 0; i < data_.length; i++) {
                data_[i]['time'] = timeago.transDate(data_[i]['time'].replace('GMT', ''))
            }
            this.setData({
                comment: comment.concat(data_)
            })
        })
        this.setData({
            page: page
        })


    },
    onShow: function() {

    },
    toDelect(e){
        var num = e.currentTarget.dataset.num;
        console.log(num)
        let stroage = wx.getStorageSync('final_data'),
            info = {
                num:num,
                openId: stroage.openId
            }
            wx.showModal({
                title: '注意!',
                content: '此操作会删除您的评论',
                success:res=>{
                    if (res.confirm){
                       
                        router.route_request('mp/delete_comment', info).catch(res => {
                            let comment = this.data.comment;
                            for (let i=0;i<comment.length;i++){
                                if(comment[i].id == num){
                                    comment.splice(i, 1)
                                }
                            }
                            this.setData({
                                comment:comment
                            })
                            console.log(this.data.comment)
                        })
                    }
                }
            })
           

    },
    todetail(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../index/more?id=' + id,
        })
    }

})