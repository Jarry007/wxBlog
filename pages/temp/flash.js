// pages/index/flash.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,

  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  toTop(e){
    console.log('置顶：'+e.detail)
  },
  toDelect(e){
    console.log('删除:'+e.detail)
  },
  comment(e){

    let comment = e.detail.value.comment;
 
    wx.request({
      url: 'http://127.0.0.1:5000/mp/comment',
      header: {
        'content-type': 'application/json/jarry' // 默认值
      },
      data:{
        comment:comment,
        post:'1',
        user:'dddadsdas'
      },
      name:'comment',
      method:'POST',
      success: res=>{
        console.log('success:'+res.data.comment)
      },
      fail: err=>{
        console.log('fail:'+err)
      }
    })
  },
  like(e){
    console.log('like')
  },
  collection(e){
    console.log('collection')
  }

})