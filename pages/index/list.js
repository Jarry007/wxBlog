// pages/index/list.js
const app = getApp()
var time = require('../../utils/util.js')
var router = require('../index/router.js');
Page({
    data: {
        posts: '',
        cardCur: 0,
        news: '',
        page: 1,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        first_tap: ''
    },
    onLoad: function(options) {
        wx.vibrateShort({})
        router.route_request('mp/new').catch(res => {
            let news = res.news;
            for (var i = 0; i < news.length; i++) {
                news[i]['time'] = time.formatTime(new Date(news[i]['time'].replace('GMT', '')))
            }
            this.setData({
                news: news
            })
        })

    },
    onReady: function() {
        
        let info = {
            page: this.data.page
        }
        router.route_request('mp/posts', info).catch(res => {
          
            let post_ = res.posts
            for (var i = 0; i < post_.length; i++) {
                post_[i]['time'] = time.formatTime(new Date(post_[i]['time'].replace('GMT', '')))
            }
            this.setData({
                posts: post_
            })
        })

    },
    more: function(event) {
        let postId = event.currentTarget.dataset.id
        wx.navigateTo({
            url: 'more?id=' + postId,
        })
    },
    onShow: function() {
       
           
      
    },
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },




    onReachBottom: function() {
        wx.vibrateShort({})
        wx.showLoading({
            title: '数据加载中...',
            icon: 'loading',
            duration: 1000
        })
        let page = this.data.page + 1,
            posts = this.data.posts,
            info = {
                page: page
            }
        console.log('page' + page)
        router.route_request('mp/posts', info).catch(res => {
            let news = res.posts
            for (var i = 0; i < news.length; i++) {
                news[i]['time'] = time.formatTime(new Date(news[i]['time'].replace('GMT', '')))
            }
            this.setData({
                posts: posts.concat(news)
            })
        })
        this.setData({
            page: page
        })


    },
    onPullDownRefresh() {
        wx.vibrateShort({})
        wx.showNavigationBarLoading()
        console.log('到顶了')
        wx.showLoading({
            title: '刷新中...',
            icon: 'loading',
            duration: 1500
        })
        let info ={
            page:1
        }
        router.route_request('mp/posts', info).catch(res => {
            let news = res.posts
            for (var i = 0; i < news.length; i++) {
                news[i]['time'] = time.formatTime(new Date(news[i]['time'].replace('GMT', '')))
            }
            this.setData({
                posts: news,
                page:1
            })
        })
        wx.stopPullDownRefresh();

    },
    totop(e) {
        let first = e.timeStamp
        if (first - this.data.first_tap < 300) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 1000
            })
        }
        this.setData({
            first_tap: first
        })

    }
})