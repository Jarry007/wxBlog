// pages/index/list.js
const app = getApp()
const {
    Router
} = require('../../utils/router.js');
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
        first_tap: '',
        pageNum:1,
        canScroll:true,
        list:[],
        hiddenLoading:false
    },
    onLoad: function (options) {
        wx.vibrateShort({})
        this.getNew()
        this.getList()
        // router.route_request('mp/new').catch(res => {
        //     let news = res.news;
        //     for (var i = 0; i < news.length; i++) {
        //         news[i]['time'] = time.formatTime(new Date(news[i]['time'].replace('GMT', '')))
        //     }
        //     this.setData({
        //         news: news
        //     })
        // })

    },
    getNew() {
        Router.get('mp/new').then(res => {
            this.setData({
                news: res.data
            })
        })
    },
    getList(e) {
        if (e === 'refresh') {
            this.data.pageNum = 1
        } else {
            if (!this.data.canScroll) return
        }
        const parmas = {
            pageNum: this.data.pageNum
        }
        Router.get('get-list', parmas).then(res => {
            console.log('列表', res)
              if(e==='refresh'){
                  this.setData({
                    list: res.data,
                    status: false,
                    hiddenLoading:true
                  })
              }else{
                this.data.list = this.data.list.concat(res.data)
                this.setData({
                  list: this.data.list,
                  hiddenLoading:true
                })
              }
            this.data.pageNum++

            this.setData({
                canScroll: res.data.length === 10
            })
        })
    },
    // onReady: function () {

    //     let info = {
    //         page: this.data.page
    //     }
    //     router.route_request('mp/posts', info).catch(res => {

    //         let post_ = res.posts
    //         for (var i = 0; i < post_.length; i++) {
    //             post_[i]['time'] = time.formatTime(new Date(post_[i]['time'].replace('GMT', '')))
    //         }
    //         this.setData({
    //             posts: post_
    //         })
    //     })

    // },
    more: function (event) {
        let postId = event.currentTarget.dataset.id
        wx.navigateTo({
            url: 'more?id=' + postId,
        })
    },
    onShow: function () {



    },
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },




    onReachBottom: function () {
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
        let info = {
            page: 1
        }
        router.route_request('mp/posts', info).catch(res => {
            let news = res.posts
            for (var i = 0; i < news.length; i++) {
                news[i]['time'] = time.formatTime(new Date(news[i]['time'].replace('GMT', '')))
            }
            this.setData({
                posts: news,
                page: 1
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