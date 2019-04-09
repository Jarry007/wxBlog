// pages/index/list.js
const app =getApp() 

Page({
    data: {
        posts:[],
        cardCur:0,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
    },
    onLoad: function (options) {
        
        if (app.globalData.posts != []){
            console.log('先于onlaunch'+app.globalData.posts)
        }
        else{
            app.postsReadyCallback = res=>{
                this.setData({
                    posts:app.globalData.posts
                })
            }

        }
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
    onShow: function () {

    },
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})
