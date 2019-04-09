var WxParse = require('../../wxParse/wxParse.js');
var like_ = require('../index/comment.js');
const app = getApp()
Page({

    data: {
        post:'',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        liked:false,
        like_count:'',
        comment_count:'',
        view_count:''

    },

    onLoad: function (options) {
       // console.log('this page id is :'+options.id)
        let posts = app.globalData.posts
        for(let i=0 ;i<posts.length;i++){
            if (posts[i]['id']==options.id){
               // console.log(i)
                let view_count= posts[i]['view_count'];
                view_count ++;
                this.setData({
                    post: posts[i],
                    like_count: posts[i]['like_count'],
                    comment_count:posts[i]['comment'],
                    view_count:view_count
                })
            }
        }   
        let parse = this.data.post.body_html; 
        WxParse.wxParse('wxshow', 'html', parse, this, 20);
    },
    like(e) {
      //  like_.like()
        let like_count = this.data.like_count,
        liked = this.data.liked;
        if (!liked){
                liked= true,
                like_count++;
            wx.showToast({
                title: '点赞成功',
                icon: 'success',
                duration: 2000
            })   
        }else{
                liked= false,
                like_count--;
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
            })
        }
        this.setData({
            liked:liked,
            like_count:like_count
        })
        
    },
    collection(e) {
        console.log('collection')
    },
})