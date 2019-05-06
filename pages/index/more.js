var WxParse = require('../../wxParse/wxParse.js');
var router = require('../index/router.js');
var time_ = require('../../utils/util.js');
var md_ = require('../../utils/md5.js')
const app = getApp()
Page({

    data: {
        post: '',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        liked: false,
        like_count: '',
        comment_count: '',
        view_count: '',
        comments: '',
        isZan:false,

    },

    onLoad: function(options) {
        if (options.id) {
            var posts = wx.getStorageSync('newsdata');
        } else {
            var posts = wx.getStorageSync('postsdata');
        }
        let view_count = posts['view_count'],
            comments = posts.new_comment.comments,
            like = posts.likes,
            stroage = wx.getStorageSync('final_data');
        if (stroage) {
            let wx_uid = md_.md5(stroage['openId']);
            for (var i = 0; i < like.length; i++) {
                if (like[i].user_id == wx_uid) {
                    var liked = true
                }
            }
        } else {
            var liked = false
        }
        view_count++;
        this.setData({
            post: posts,
            like_count: posts['like_count'],
            comment_count: posts['comment'],
            view_count: view_count,
            comments: comments,
            liked: liked
        })
        console.log(this.data.post)
        let parse = this.data.post.body_html;
        WxParse.wxParse('wxshow', 'html', parse, this, 20);
    },
    like(e) {
        //  like_.like()
        let stroage = wx.getStorageSync('final_data');
        if (stroage) {
            let like_count = this.data.like_count,
                liked = this.data.liked,
                num = this.data.post.id,
                info = {
                    openId: stroage.openId,
                    num: num
                };
            router.route_request('mp/like',info).catch(res=>{
                console.log({'res':res})
            })
            if (!liked) {
                liked = true,
                    like_count++;
                wx.showToast({
                    title: '点赞成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                liked = false,
                    like_count--;
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                })
            }
            this.setData({
                liked: liked,
                like_count: like_count
            })

        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }


    },
    collection(e) {
        console.log('collection')
    },
    comment(e) {
        console.log(e.detail.value.comment)
        let stroage = wx.getStorageSync('final_data')
        console.log(stroage)
        if (stroage) {
            let num = this.data.post['id'],
                wx_comment = e.detail.value.comment,
                info = {
                    openId: stroage.openId,
                    wx_comment: wx_comment,
                    num: num
                };
            router.route_request('mp/comment',info).catch(res=>{
                this.setData({
                    comments:res.new_comment.comments
                })
            })
            this.tobottom()
            

        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        console.log('到顶了')
        wx.showLoading({
            title: '更新中...',
            icon: 'loading',
            duration: 1500
        })
        let info = {
            num: this.data.post.id
        }
        router.route_request('mp/refresh', info).catch(c => {
            this.setData({
                post: c
            })
        })
        

    },
    zan:function(e){
        let stroage = wx.getStorageSync('final_data'),
        isZan = this.data.isZan,
        num = e.currentTarget.dataset.id;
        console.log('num'+num)

        if (stroage) {
               let info = {
                    openId: stroage.openId,
                    num: num
                };
            console.log('num' + num)
            router.route_request('mp/like_comment', info).catch(res => {
                console.log({ 'res': res })
            })
            if (!isZan) {
                isZan = true,
                    
                wx.showToast({
                    title: '点赞成功',
                    icon: 'success',
                    duration: 1000
                })
            } else {
                isZan = false,
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 1000
                })
            }
            this.setData({
                isZan: isZan,

            })


        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }


        
    },
    tobottom(){
        wx.createSelectorQuery().select('#b_comment').boundingClientRect(function (rect) {
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: rect.bottom
            })
        }).exec()
    }
})