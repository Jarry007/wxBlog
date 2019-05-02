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
        if (options.id){
        let posts = app.globalData.new_
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
        } }
        else{
            let posts = wx.getStorageSync('postsdata');
            let view_count = posts['view_count'];
            view_count++;
            this.setData({
                post:posts,
                like_count:posts['like_count'],
                comment_count:posts['comment'],
                view_count:view_count
            })
        } 
        console.log(this.data.post) 
        let parse = this.data.post.body_html; 
        WxParse.wxParse('wxshow', 'html', parse, this, 20);
    },
    like(e) {
      //  like_.like()
        let like_count = this.data.like_count,
        liked = this.data.liked,
        num = this.data.post['id']
        if (!liked){
                liked= true,
                like_count++;
            wx.showToast({
                title: '点赞成功',
                icon: 'success',
                duration: 2000
            }) 
            like_.like(num)  
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
    comment(e){
        console.log(e.detail.value.comment)
       let stroage = wx.getStorageSync('final_data')
       console.log(stroage)
        if (stroage){
            console.log('you')
            let num = this.data.post['id'],
            wx_comment = e.detail.value.comment,
            info = {
                openId:stroage.openId,
                wx_comment:wx_comment,
                num : num
            };
            wx.request({
                url: 'http://127.0.0.1:5000/mp/comment',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    info: JSON.stringify(info) //把object转化为json数据
                },
                method: 'POST',
                success:e=>{
                    console.log(e)
                    wx.showToast({
                        title: '评论成功',
                        icon:'success',
                        duration:1000
                    })
                },
                fail:err=>{
                    wx.showToast({
                        title: '失败',
                        icon:'fail',
                        duration:1000
                    })
                }
            })
            let new_comment =[{
                body:wx_comment,
                _link:{
                    avatar:stroage.avatarUrl,
                    username:stroage.nickName
                },
                time:Date.now()
            }]
            let oldpost = this.data.post,
            newcomment = oldpost['new_comment']
            newcomment['comment'].concat(new_comment)
            
            this.setData({
                post:oldpost
                
            })

        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        }
    }
})