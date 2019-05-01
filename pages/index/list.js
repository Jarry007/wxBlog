// pages/index/list.js
const app =getApp() 
var time = require('../../utils/util.js')

Page({
    data: {
        posts:[],
        cardCur:0,
        news :'',
        page :1,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
    },
    onLoad: function (options) {
        
    
        if (app.globalData.new_ != []) {
            console.log('先于onlaunch' + app.globalData.new_)
        }
        else {
            app.newsReadyCallback = res => {
                this.setData({
                    news: app.globalData.new_
                })
            }

        }
        this.pagination(this.data.page)
    },
    onReady: function () {

    },
    more:function(event){
        
        let postId = event.currentTarget.dataset.id
        console.log(postId)
        wx.navigateTo({
            url: 'more?id='+postId,
        })
    },
    show_more:function(event){
        let postId = event.currentTarget.dataset.id
        wx.setStorageSync('postsdata', this.data.posts[postId])
        wx.navigateTo({
            url: 'more?num='+postId,
        })
    },
    onShow: function () {

    },
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    

 
    pagination(page){
        wx.request({
            url: 'http://127.0.0.1:5000/mp/posts',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                page: JSON.stringify(page) //把object转化为json数据
            },
            method: 'POST',
            success: u=> {
                let items = u.data.posts,
                posts = this.data.posts
                
                if(items.length != 0){
                    for (var i = 0; i < items.length; i++) {
                        items[i]['time'] = time.formatTime(new Date(items[i]['time'].replace('GMT', '')))
                    }
                    this.setData({
                        posts: posts.concat(items)
                    })
                }
                else{
                    wx.showToast({
                        title: '全部加载完毕...',
                        icon: 'success',
                        duration: 1000
                    })
                } 
               
            },
            fail: f=>{
                console.log(f)
            },
        })
    
    },
    onReachBottom: function () {
        console.log('触底了')
        wx.showLoading({
            title: '数据加载中...',
            icon: 'loading',
            duration: 1000
        })
        let page = this.data.page +1
        this.pagination(page)
        this.setData({
            page:page
        })

       
    },
    onPullDownRefresh(){
        wx.showNavigationBarLoading()
        console.log('到顶了')
    }
})
