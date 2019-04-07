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
        isPopping: false,//是否已经弹出
        animPlus: {},//旋转动画
        animCollect: {},//item位移,透明度
        animTranspond: {},//item位移,透明度
        animInput: {},//item位移,透明度

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
    zan (e){
        console.log(e.detail)
    },

    onReady: function () {

    },

    onShow: function () {

    },
    plus: function () {
        if (this.data.isPopping) {
            //缩回动画
            this.popp();
            this.setData({
                isPopping: false
            })
        } else if (!this.data.isPopping) {
            //弹出动画
            this.takeback();
            this.setData({
                isPopping: true
            })
        }
    },
    input: function () {
        console.log("input")
    },
    transpond: function () {
        console.log("transpond")
    },
    collect: function () {
        console.log("collect")
    },

    //弹出动画
    popp: function () {
        //plus顺时针旋转
        var animationPlus = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationcollect = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationTranspond = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationInput = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        animationPlus.rotateZ(180).step();
        animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
        animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
        animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
        this.setData({
            animPlus: animationPlus.export(),
            animCollect: animationcollect.export(),
            animTranspond: animationTranspond.export(),
            animInput: animationInput.export(),
        })
    },
    //收回动画
    takeback: function () {
        //plus逆时针旋转
        var animationPlus = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationcollect = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationTranspond = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        var animationInput = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-out'
        })
        animationPlus.rotateZ(0).step();
        animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
        animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
        animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
        this.setData({
            animPlus: animationPlus.export(),
            animCollect: animationcollect.export(),
            animTranspond: animationTranspond.export(),
            animInput: animationInput.export(),
        })
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