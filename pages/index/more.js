var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

    data: {
        posts:[],
        post:'',
        comments:[],
        reply:'',
        parse:'',
        show:{},
      

    },

    onLoad: function (options) {
        if (app.globalData.posts && app.globalData.posts !=''){
            this.setData({
                posts:app.globalData.posts
            })
        }
        else{
            app.postsReadyCallback = res => {
                this.setData({
                    posts: app.globalData.posts
                })
            }
        }
        console.log('this page id is :'+options.id)
        let posts = this.data.posts
        this.setData({
            post:posts[options.id]
        })
        let parse = this.data.post.body_html;
       
        WxParse.wxParse('wxshow', 'html', parse, this, 20);
    },
    comment(e) {

        let comment = e.detail.value.comment;

        wx.request({
            url: 'http://127.0.0.1:5000/mp/comment',
            header: {
                'content-type': 'application/json/jarry' // 默认值
            },
            data: {
                comment: comment,
                post: '1',
                user: 'dddadsdas'
            },
            name: 'comment',
            method: 'POST',
            success: res => {
                console.log('success:' + res.data.comment)
            },
            fail: err => {
                console.log('fail:' + err)
            }
        })
    },
    like(e) {
        console.log('like')
    },
    collection(e) {
        console.log('collection')
    },
})