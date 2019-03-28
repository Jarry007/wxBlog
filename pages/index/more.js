const app = getApp()
Page({

    data: {
        posts:[],
        post:'',
        comments:[],
        reply:'',
        parse:'',
        article:{},
        show:{}
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
        console.log(parse)
        let article = app.towxml.toJson(
            parse,'html'
        )
        console.log(article)
        article.theme = 'light'
        this.setData({
            article:article
        })

    },
    zan (e){
        console.log(e.detail)
    },

    onReady: function () {

    },

    onShow: function () {

    },
    comment:function(event){
        let obj = event.detail.value.say;
        console.log('comment is :'+obj)
        wx.request({
            url: 'http://127.0.0.1:5000/request_data',
            data:{
                data:obj
            },
            success:res=>{
                console.log('python get success'+res)
            },
            fail:err=>{
                console.log('python get fail'+err)
            }
        })
    }
})